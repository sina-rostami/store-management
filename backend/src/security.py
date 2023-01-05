from datetime import datetime, timedelta
from http import HTTPStatus

from jwt import encode
from flask import jsonify, make_response
from werkzeug.security import check_password_hash

from seller_manager import Seller
from database_handler import Scratch


class Security:
    def __init__(self, database_session, app_secret_key) -> None:
        self.database_session = database_session
        self.app_secret_key = app_secret_key

    def authorize(self, input_data):
        admin_username = self.database_session.query(Scratch).filter_by(key='admin_username').first().value
        id = 0
        if admin_username == input_data.get('username'):
            username = admin_username
            password = self.database_session.query(Scratch).filter_by(key='admin_password').first().value
            role = 'admin'
        else:
            user = self.database_session.query(Seller).filter_by(username=input_data.get('username')).first()
            role = 'seller'
            if not user:
                return make_response(jsonify({'message': 'INVALID_DATA'}), HTTPStatus.UNAUTHORIZED)

            username = user.username
            password = user.password
            id = user.id

        if check_password_hash(password, input_data.get('password')):
            token = self.create_token(username)

            return make_response(jsonify({'token': token, 'role': role, 'user_id': id}), HTTPStatus.OK)

        return make_response(jsonify({'message': 'INVALID_DATA'}), HTTPStatus.UNAUTHORIZED)

    def create_token(self, username):
        return encode({'username': username, 'exp': datetime.utcnow() + timedelta(days=1)}, self.app_secret_key, "HS256")
