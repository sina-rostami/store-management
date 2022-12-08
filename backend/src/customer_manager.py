
from database_handler import Customer

class CustomerManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def get_customer_as_json(self, customer):
        return {'id': customer.id,
                'name': customer.name,
                'credit': customer.credit,
                'join_date': customer.join_date.timestamp(),
                'is_active': customer.is_active,
                'phone_number': customer.phone_number}

    def get_all_customers_as_json(self):
        return [self.get_customer_as_json(customer) for customer in self.database_session.query(Customer).all()]
