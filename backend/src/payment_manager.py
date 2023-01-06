import datetime

from database_handler import Payment, Payer, Customer


class PaymentManager:
    def __init__(self, database_session) -> None:
        self.database_session = database_session

    def add_payment(self, data):
        old_customer = self.database_session.query(Customer).filter_by(id=data['customer_id']).first()

        if not old_customer:
            return False, 'NOT_EXIST'
        if not old_customer.is_active:
            return False, 'ALREADY_LEFT'

        payer = self.database_session.query(Payer).filter_by(name=data['name'], phone_number=data['phone_number']).first()

        if not payer:
            payer = Payer(name=data['name'], phone_number=data['phone_number'])
            self.database_session.add(payer)
            self.database_session.commit()

        self.database_session.add(
            Payment(payer_id=payer.id, customer_id=old_customer.id, amount=data['amount'], date=datetime.datetime.now(),
                    method=data['method']))

        old_customer.credit += data.get('amount')

        self.database_session.commit()

        return True, 'SUCCESS'

    def get_payment_as_json(self, payment):
        payer = self.database_session.query(Payer).filter_by(id=payment.payer_id).first()
        customer = self.database_session.query(Customer).filter_by(id=payment.customer_id).first()
        return {'id': payment.id, 'payer_name': payer.name, 'payer_phone_number': payer.phone_number, 'customer_name': customer.name,
                'payer_id': payer.id, 'customer_id': customer.id, 'amount': payment.amount, 'date': payment.date, 'method': payment.method}

    def get_payments_as_json(self):
        return [self.get_payment_as_json(payment) for payment in self.database_session.query(Payment).all()]

    def get_a_payment_as_json(self, payment_id):
        payment = self.database_session.query(Payment).filter_by(id=payment_id).first()
        if not payment:
            return False, 'NOT_EXIST'

        return True, self.get_payment_as_json(payment)
