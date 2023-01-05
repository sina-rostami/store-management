patterns = {
    'password': r'^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$',
    'phone_number': r'^09[0|1|2|3][0-9]{8}$',
    'name': r'^[^!@#$%^&*0-9]{4,20}$',
    'username': r'^[A-Za-z_0-9]{4,15}$',
    'stock_number': r'\d',
    'credit': r'\d',
    'price': r'\d',
    'category_id': r'\d',
    'customer_id': r'\d',
    'seller_id': r'\d',
    'balance': r'\d'
}
