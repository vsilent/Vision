from app import db
from app.users import constants as USER
from hashlib import md5
from sqlalchemy import event
from sqlalchemy.sql import text
import datetime
from flask.ext.security import RoleMixin, UserMixin

# Define models
users_roles = db.Table(
    'users_roles',
    db.Column('user_id', db.Integer(), db.ForeignKey('users_user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)

class Role(db.Model, RoleMixin):
    """
    Class Role
    """
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

    def __repr__(self):
        return '<Role %r>' % (self.name)

    def __unicode__(self):
        return u"%s" % (self.name)

class User(db.Model, UserMixin):
    """
    Class User

    """
    __tablename__ = 'users_user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False)
    alias = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))
    roles = db.relationship(
        'Role', secondary=users_roles,
        backref=db.backref('users_user', lazy='dynamic')
    )
    status = db.Column(db.SmallInteger, default=USER.NEW)
    address = db.Column(db.String(255))
    mobile = db.Column(db.String(50))
    website = db.Column(db.String(255))
    country = db.Column(db.String(255))
    photo = db.Column(db.String(255))
    description = db.Column(db.UnicodeText())
    active = db.Column(db.Boolean, default=False)
    confirmed = db.Column(db.Boolean, default=False)
    confirmed_at = db.Column(db.DateTime())
    created = db.Column('created', db.DateTime, default=datetime.datetime.now)
    updated = db.Column('updated', db.DateTime, default=datetime.datetime.now)

    def __unicode__(self):
        return u"%s" % (self.name)

    def __init__(self, name=None, email=None, alias=None, password=None):
        self.name = name
        self.email = email
        self.alias = alias
        self.password = password

    def getStatus(self):
        return USER.STATUS[self.status]

    def get_role(self):
        return USER.ROLE[self.roles]

    def __repr__(self):
        return '<User %r>' % (self.name)

    def is_confirmed(self):
        return self.confirmed

    def is_active(self):
        return self.active

    # Flask-Login integration
    def is_authenticated(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def get_email(self):
        return self.email

    def avatar(self, size):
        return 'http://www.gravatar.com/avatar/' + \
            md5(self.email).hexdigest() + '?d=mm&s=' + str(size)

