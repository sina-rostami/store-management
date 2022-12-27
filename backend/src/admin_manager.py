from werkzeug.security import generate_password_hash

from database_handler import Scratch


class AdminManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def edit_admin(self, data):
        username, password = data.get('username'), data.get('password')
        admin_name = self.database_session.query(Scratch).filter_by(key='admin_username').first().value
        old_password = self.database_session.query(Scratch).filter_by(key='admin_password').first().value
        admin_name = username
        old_password = generate_password_hash(password)
        self.database_session.commit()

        return {'username': admin_name, 'password': password}
