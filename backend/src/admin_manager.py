from werkzeug.security import generate_password_hash

from database_handler import Scratch


class AdminManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def edit_admin(self, data):
        username, password = data.get('username'), data.get('password')

        default_rows = {'admin_username': username, 'admin_password': generate_password_hash(password)}

        for key, value in default_rows.items():
            obj = self.database_session.query(Scratch).filter_by(key=key).first()
            if self.database_session.query(Scratch).filter_by(key=key).first():
                self.database_session.delete(obj)
            self.database_session.add(Scratch(key, value))

        self.database_session.commit()

        return True, 'SUCCESS'
