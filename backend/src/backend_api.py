from functools import wraps
from http import HTTPStatus

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from jwt import decode, ExpiredSignatureError
from werkzeug.exceptions import BadRequest
from security import Security
from backend import Backend
from database_handler import Seller

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = 'your secret key'
CORS(app)


backend = Backend(app.config['SECRET_KEY'])


# decorator for verifying the JWT
def normal_authorization(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing !!'}), HTTPStatus.UNAUTHORIZED
        try:
            data = decode(token, app.config['SECRET_KEY'], "HS256")
            current_user = backend.seller_manager.get_seller(data['username'])
            if not current_user:
                current_user = backend.find_admin(data['username'])
        except ExpiredSignatureError as e:
            return jsonify({
                'message': 'Token is Expired !!'
            }), HTTPStatus.UNAUTHORIZED
        except Exception as e:
            return jsonify({
                'message': 'Token is invalid !!'
            }), HTTPStatus.UNAUTHORIZED

        return f(current_user, *args, **kwargs)

    return decorated


def admin_authorization(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers.get('x-access-token')
        if not token:
            return jsonify({'message': 'Token is missing !!'}), HTTPStatus.UNAUTHORIZED
        try:
            data = decode(token, app.config['SECRET_KEY'], "HS256")
            current_user = backend.find_admin(data['username'])
        except ExpiredSignatureError as e:
            return jsonify({
                'message': 'Token is Expired !!'
            }), HTTPStatus.UNAUTHORIZED
        except Exception as e:
            return jsonify({
                'message': 'Token is invalid !!'
            }), HTTPStatus.UNAUTHORIZED

        return f(current_user, *args, **kwargs)

    return decorated


def check_fields(data, fields):
    if not data:
        return make_response(
            jsonify({'message': 'EXPECTED_DATA'}), HTTPStatus.BAD_REQUEST)
    for x in fields:
        if data.get(x) == None:
            raise BadRequest("EXPECTED_" + x.upper())


@app.route('/order', methods=['POST'])
@normal_authorization
def place_order(current_user):
    try:
        did_success, message = backend.seller_manager.place_order(request.json)
        if not did_success:
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.OK
    except KeyError as e:
        return jsonify({'message': f'{e} is not defined in the json data.'}), HTTPStatus.BAD_REQUEST
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while placing order : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR



@app.route('/order', methods=['GET'])
@normal_authorization
def get_orders(current_user):
    try:
        # every seller gets its own placed order
        return jsonify(backend.seller_manager.get_all_orders_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting orders : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR



@app.route('/customer', methods=['GET'])
@normal_authorization
def get_customers(current_user):
    try:
        return jsonify(backend.customer_manager.get_all_customers_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting customers : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/customer', methods=['POST'])
@normal_authorization
def add_customer(current_user):
    try:
        check_fields(request.json, ['name', 'phone_number', 'credit'])
        did_success, message = backend.customer_manager.add_customer(request.json)
        if not did_success:
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting customers : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/customer/<int:customer_id>', methods=['PUT'])
@normal_authorization
def edit_customer(current_user, customer_id):
    try:
        check_fields(request.json, ['name', 'phone_number', 'credit', 'is_active'])
        did_success, message = backend.customer_manager.edit_customer(customer_id, request.json)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting customers : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/product', methods=['POST'])
@normal_authorization
def add_product(current_user):
    try:
        check_fields(request.json, ['name', 'price', 'stock_number', 'category_id'])
        did_success, message = backend.product_manager.add_product(request.json)
        if not did_success:
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while adding product : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/product/<int:product_id>', methods=['PUT'])
@normal_authorization
def edit_product(current_user, product_id):
    try:
        check_fields(request.json, ['name', 'price', 'stock_number', 'category_id'])
        did_success, message = backend.product_manager.edit_product(product_id, request.json)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while editting product : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR



@app.route('/product', methods=['GET'])
@normal_authorization
def get_products(current_user):
    try:
        return jsonify(backend.product_manager.get_all_products_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting product : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR



@app.route('/seller', methods=['GET'])
@admin_authorization
def get_sellers(current_user):
    try:
        return jsonify(backend.seller_manager.get_all_sellers_as_json()), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting sellers : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/login', methods=['POST'])
def login():
    auth = request.json
    try:
        check_fields(auth, {'username', 'password'})
        return backend.security.authorize(auth)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description}), HTTPStatus.BAD_REQUEST)


@app.route('/seller', methods=['POST'])
@admin_authorization
def add_seller(current_user):
    data = request.json
    try:
        check_fields(data, {'username', 'name', 'password'})
        return backend.seller_manager.create_seller(data)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description}), HTTPStatus.BAD_REQUEST)


@app.route('/seller', methods=['PUT'])
@normal_authorization
def edit_profile(current_user):
    data = request.json

    if isinstance(current_user, Seller) and current_user.username != data.get('old_username'):
        return make_response(jsonify({'message': 'FORBIDDEN'}), HTTPStatus.FORBIDDEN)

    try:
        check_fields(data, {'username', 'name', 'password'})
        return backend.seller_manager.edit_account(data, current_user)
    except BadRequest as e:
        return make_response(
            jsonify({'message': e.description, }), HTTPStatus.BAD_REQUEST)


if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug=True)


@app.route('/login', methods=['POST'])
def login():
    # creates dictionary of form data
    auth = request.form
    if not auth or not auth.get('username') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        return jsonify(
            'USERNAME_AND_PASSWORD_REQUIRED',
            400,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )
    return backend.security.authorize(auth)


@app.route('/add-seller', methods=['POST'])
@token_required
def add_seller(f):
    data = request.json

    return backend.seller_manager.create_seller(data)


@app.route('/edit-account', methods=['POST'])
@token_required
def edit_profile(f):
    data = request.json

    return backend.seller_manager.edit_account(data)


if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug=True)


@app.route('/login', methods=['POST'])
def login():
    # creates dictionary of form data
    auth = request.form
    if not auth or not auth.get('username') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        return jsonify(
            'USERNAME_AND_PASSWORD_REQUIRED',
            400,
            {'WWW-Authenticate': 'Basic realm ="Login required !!"'}
        )
    return backend.security.authorize(auth)


@app.route('/add-seller', methods=['POST'])
@token_required
def add_seller(f):
    data = request.json

    return backend.seller_manager.create_seller(data)


@app.route('/edit-account', methods=['POST'])
@token_required
def edit_profile(f):
    data = request.json

    return backend.seller_manager.edit_account(data)


if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug=True)
