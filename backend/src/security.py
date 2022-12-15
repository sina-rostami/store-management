from datetime import datetime, timedelta

# imports for PyJWT authentication
import jwt
from flask import Flask, jsonify, make_response
# creates Flask object
from werkzeug.security import check_password_hash

from seller_manager import Seller
from database_handler import Scratch

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'


class Security:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def authorize(self, input_data):
        user = self.database_session.query(Seller).filter_by(username=input_data.get('username')).first()
        admin_username = self.database_session.query(Scratch).filter_by(key='admin_username').first().value

        if not user:
            if admin_username == input_data.get('username'):
                password = self.database_session.query(Scratch).filter_by(key='admin_password').first().value
            else:
                return make_response('INVALID_USER_NAME', 401)
        else:
            username = user.username
            password = user.password

        if check_password_hash(password, input_data.get('password')):
            token = jwt.encode({
                'username': username,
                'exp': datetime.utcnow() + timedelta(days=1)
            }, app.config['SECRET_KEY'], "HS256")

            return make_response(jsonify({'token': token}), 200)

        return make_response('INVALID_PASSWORD', 401)
