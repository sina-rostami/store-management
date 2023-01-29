from database_handler import Category


class CategoryManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def create_category(self, data):
        name = data['name']

        same_category = self.database_session.query(Category).filter_by(name=name).first()

        if same_category:
            return False, 'ALREADY_EXISTS'

        self.database_session.add(Category(name=name))

        self.database_session.commit()

        return True, 'SUCCESS'

    def get_categories(self, page, per_page):
        return [self.get_category_as_json(payment) for payment in
                self.database_session.query(Category).limit(per_page).offset((page-1) * per_page).all()]

    def get_a_category_as_json(self, category_id):
        category = self.database_session.query(Category).filter_by(id=category_id).first()

        if not category:
            return False, 'NOT_EXIST'

        return True, self.get_category_as_json(category)

    def get_category_as_json(self, category):
        return {'id': category.id, 'name': category.name}

    def edit_category(self, data, category_id):

        same_category = self.database_session.query(Category).filter_by(id=category_id).first()

        if not same_category:
            return False, 'NOT_EXIST'

        category = self.database_session.query(Category).filter_by(name=data['name']).first()

        if category and category.id != id:
            return False, 'ALREADY_EXISTS'

        same_category.name = data['name']

        self.database_session.commit()

        return True, 'SUCCESS'
