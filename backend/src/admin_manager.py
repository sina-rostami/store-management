from werkzeug.security import generate_password_hash

from database_handler import Scratch


class AdminManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def edit_admin(self, data):
        username, password = data.get('username'), data.get('password')

        obj = self.database_session.query(Scratch).filter_by(key='admin_username').first()
        obj.value = username

        self.database_session.commit()

        return True, 'SUCCESS'
