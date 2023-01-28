from database_handler import Category


class CategoryManager:
    def __init__(self, database_session):
        self.database_session = database_session

    def create_category(self, data):
        name = data['name']

        same_category = self.database_session.query(Category).filter_by(id=name).first()

        if same_category:
            return False, 'ALREADY_EXISTS'

        self.database_session.add(Category(name=name))

        self.database_session.commit()

        return True, 'SUCCESS'
