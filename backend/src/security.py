from datetime import datetime, timedelta

# imports for PyJWT authentication
import jwt
from flask import Flask, jsonify, make_response
# creates Flask object
from werkzeug.security import check_password_hash

from seller_manager import Seller

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'


class Security:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def authorize(self, auth):

        user = self.database_session.query(Seller) \
            .filter_by(username=auth.get('username')) \
            .first()

        if not user:
            # returns 401 if user does not exist
            return make_response(
                'INVALID_USER_NAME',
                401,
                {'User Does not exists'}
            )

        if check_password_hash(user.password, auth.get('password')):
            # generates the JWT Token
            token = jwt.encode({
                'username': user.username,
                'exp': datetime.utcnow() + timedelta(minutes=30)
            }, app.config['SECRET_KEY'], "HS256")

            return make_response(jsonify({'token': token, 'code': 200, 'status': 'success'}), 200)
        # returns 403 if password is wrong
        return make_response(
            'INVALID_PASSWORD',
            403,
            {'Invalid password'}
        )
