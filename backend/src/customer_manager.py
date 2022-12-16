import datetime

from database_handler import Customer


class CustomerManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def add_customer(self, data):
        old_customer = self.database_session.query(Customer).filter_by(
            name=data['name'], phone_number=data['phone_number']).first()

        if old_customer:
            return False, 'AREADY_EXISTS'
        elif data['credit'] < 0:
            return False, 'NEGATIVE_CREDIT'

        self.database_session.add(
            Customer(name=data['name'], credit=data['credit'], phone_number=data['phone_number'],
                     join_date=datetime.datetime.now(), is_active=True))
        self.database_session.commit()

        return True, 'SUCCESS'

    def edit_customer(self, id, data):
        old_customer = self.database_session.query(Customer).filter_by(id=id).first()

        if not old_customer:
            return False, 'NOT_EXIST'
        elif data['credit'] < 0:
            return False, 'NEGATIVE_CREDIT'

        old_customer.name = data['name']
        old_customer.credit = data['credit']
        old_customer.phone_number = data['phone_number']
        old_customer.is_active = data['is_active']

        self.database_session.commit()

        return True, 'SUCCESS'

    def get_customer_as_json(self, customer):
        return {'id': customer.id,
                'name': customer.name,
                'credit': customer.credit,
                'join_date': customer.join_date.timestamp(),
                'is_active': customer.is_active,
                'phone_number': customer.phone_number}

    def get_all_customers_as_json(self):
        return [self.get_customer_as_json(customer) for customer in self.database_session.query(Customer).all()]
