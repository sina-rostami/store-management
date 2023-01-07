from werkzeug.security import generate_password_hash, check_password_hash

from database_handler import Scratch, Seller


class AdminManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def edit_admin(self, data):
        username = data.get('username')
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        confirm_new_password = data.get('confirm_new_password')

        username_db = self.database_session.query(Scratch).filter_by(key='admin_username').first()
        password_db = self.database_session.query(Scratch).filter_by(key='admin_password').first()

        if not check_password_hash(password_db.value, old_password):
            return False, "WRONG_PASSWORD"
        if new_password != confirm_new_password:
            return False, "PASSWORDS_NOT_MATCH"

        username_db.value = username
        password_db.value = generate_password_hash(new_password)

        admin_seller = self.database_session.query(Seller).filter_by(id=0).first()
        admin_seller.name = username
        admin_seller.username = username
        admin_seller.password = generate_password_hash(new_password)

        self.database_session.commit()

        return True, 'SUCCESS'
