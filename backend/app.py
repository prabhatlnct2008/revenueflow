import os
import json
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///revenueflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for Next.js frontend
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

db = SQLAlchemy(app)

# Admin credentials from environment
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'admin123')

# Database Models
class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    website = db.Column(db.String(200))
    goal = db.Column(db.String(100))
    business_type = db.Column(db.String(50))
    source = db.Column(db.String(50), nullable=False)  # book_call, lead_magnet, exit_intent
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
    event_data = db.Column(db.Text)  # JSON string
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

# Auth decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

# API Endpoints
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

# Admin Routes
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    error = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            error = 'Invalid credentials'

    return render_template('login.html', error=error)

@app.route('/admin/logout')
def admin_logout():
    session.pop('logged_in', None)
    return redirect(url_for('admin_login'))

@app.route('/admin')
@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    # Get stats
    total_leads = Lead.query.count()
    today = datetime.utcnow().date()
    leads_today = Lead.query.filter(
        db.func.date(Lead.created_at) == today
    ).count()

    # Leads by source
    leads_by_source = db.session.query(
        Lead.source, db.func.count(Lead.id)
    ).group_by(Lead.source).all()

    # Recent leads
    recent_leads = Lead.query.order_by(Lead.created_at.desc()).limit(10).all()

    # Event stats
    total_events = Event.query.count()

    # Events by type
    events_by_type = db.session.query(
        Event.event_type, db.func.count(Event.id)
    ).group_by(Event.event_type).all()

    # Leads over last 7 days
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    leads_by_day = db.session.query(
        db.func.date(Lead.created_at),
        db.func.count(Lead.id)
    ).filter(Lead.created_at >= seven_days_ago).group_by(
        db.func.date(Lead.created_at)
    ).all()

    return render_template('dashboard.html',
        total_leads=total_leads,
        leads_today=leads_today,
        leads_by_source=dict(leads_by_source),
        recent_leads=recent_leads,
        total_events=total_events,
        events_by_type=dict(events_by_type),
        leads_by_day=leads_by_day
    )

@app.route('/admin/leads')
@login_required
def admin_leads():
    page = request.args.get('page', 1, type=int)
    per_page = 20

    leads = Lead.query.order_by(Lead.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return render_template('leads.html', leads=leads)

@app.route('/admin/events')
@login_required
def admin_events():
    page = request.args.get('page', 1, type=int)
    per_page = 50

    events = Event.query.order_by(Event.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )

    return render_template('events.html', events=events)

# API endpoints for admin (JSON)
@app.route('/api/admin/stats')
@login_required
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
@login_required
def api_admin_leads():
    leads = Lead.query.order_by(Lead.created_at.desc()).all()
    return jsonify([lead.to_dict() for lead in leads])

@app.route('/api/admin/events')
@login_required
def api_admin_events():
    events = Event.query.order_by(Event.created_at.desc()).limit(100).all()
    return jsonify([event.to_dict() for event in events])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
