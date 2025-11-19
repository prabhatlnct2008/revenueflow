import os
import json
import secrets
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///revenueflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for Next.js frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

db = SQLAlchemy(app)

# Admin credentials from environment
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

# Simple token storage (in production, use Redis or database)
active_tokens = {}

# Database Models
class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    website = db.Column(db.String(200))
    goal = db.Column(db.String(100))
    business_type = db.Column(db.String(50))
    source = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'website': self.website,
            'goal': self.goal,
            'business_type': self.business_type,
            'source': self.source,
            'created_at': self.created_at.isoformat()
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(50), nullable=False)
    event_data = db.Column(db.Text)
    page = db.Column(db.String(200))
    session_id = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'event_type': self.event_type,
            'event_data': json.loads(self.event_data) if self.event_data else {},
            'page': self.page,
            'session_id': self.session_id,
            'created_at': self.created_at.isoformat()
        }

# Create tables
with app.app_context():
    db.create_all()

# Auth decorator for API endpoints
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'message': 'Missing or invalid token'}), 401

        token = auth_header.split(' ')[1]
        if token not in active_tokens:
            return jsonify({'message': 'Invalid or expired token'}), 401

        return f(*args, **kwargs)
    return decorated_function

# Public API Endpoints (no auth required)
@app.route('/api/leads', methods=['POST'])
def create_lead():
    data = request.json

    lead = Lead(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone') or data.get('whatsapp'),
        website=data.get('website'),
        goal=data.get('goal'),
        business_type=data.get('businessType') or data.get('business_type'),
        source=data.get('source', 'unknown')
    )

    db.session.add(lead)
    db.session.commit()

    return jsonify({'success': True, 'id': lead.id}), 201

@app.route('/api/events', methods=['POST'])
def create_event():
    data = request.json

    event = Event(
        event_type=data.get('event_type'),
        event_data=json.dumps(data.get('event_data', {})),
        page=data.get('page'),
        session_id=data.get('session_id')
    )

    db.session.add(event)
    db.session.commit()

    return jsonify({'success': True, 'id': event.id}), 201

# Admin Authentication
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        # Generate a secure token
        token = secrets.token_hex(32)
        active_tokens[token] = {
            'username': username,
            'created_at': datetime.utcnow()
        }
        return jsonify({'success': True, 'token': token})

    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/admin/logout', methods=['POST'])
@token_required
def admin_logout():
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    if token in active_tokens:
        del active_tokens[token]
    return jsonify({'success': True})

# Protected Admin API Endpoints
@app.route('/api/admin/stats')
@token_required
def api_admin_stats():
    total_leads = Lead.query.count()
    total_events = Event.query.count()

    today = datetime.utcnow().date()
    leads_today = Lead.query.filter(
        db.func.date(Lead.created_at) == today
    ).count()

    leads_by_source = dict(db.session.query(
        Lead.source, db.func.count(Lead.id)
    ).group_by(Lead.source).all())

    events_by_type = dict(db.session.query(
        Event.event_type, db.func.count(Event.id)
    ).group_by(Event.event_type).all())

    return jsonify({
        'total_leads': total_leads,
        'leads_today': leads_today,
        'total_events': total_events,
        'leads_by_source': leads_by_source,
        'events_by_type': events_by_type
    })

@app.route('/api/admin/leads')
@token_required
def api_admin_leads():
    limit = request.args.get('limit', type=int)
    query = Lead.query.order_by(Lead.created_at.desc())

    if limit:
        query = query.limit(limit)

    leads = query.all()
    return jsonify([lead.to_dict() for lead in leads])

@app.route('/api/admin/events')
@token_required
def api_admin_events():
    limit = request.args.get('limit', 100, type=int)
    events = Event.query.order_by(Event.created_at.desc()).limit(limit).all()
    return jsonify([event.to_dict() for event in events])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
