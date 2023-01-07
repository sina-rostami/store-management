patterns = {
    'password': r'^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$',
    'new_password': r'^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$',
    'confirm_new_password': r'^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$',
    'phone_number': r'^09[0|1|2|3][0-9]{8}$',
    'name': r'^[^!@#$%^&*0-9]{2,20}$',
    'username': r'^[A-Za-z_0-9]{4,15}$',
    'stock_number': r'^\d+$',
    'credit': r'^(\-?)\d+(.\d+|)$',
    'price': r'^\d+(.\d+|)$',
    'category_id': r'^\d+$',
    'customer_id': r'^\d+$',
    'seller_id': r'^\d+$',
    'balance': r'^\d+(.\d+|)$',
    'amount': r'^\d+(.\d+|)$',
    'method': r'^\d+$'
}
