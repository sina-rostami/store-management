from functools import wraps
from http import HTTPStatus

from flask import Flask, request, jsonify, make_response, send_from_directory
from flask_cors import CORS
from jwt import decode, ExpiredSignatureError
from werkzeug.exceptions import BadRequest

from backend import Backend
import os

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = '7aMpqUuCDCogpSlH1PoR5sy8MyqLWsXW'
app.config['UPLOAD_FILE'] = os.path.join(os.path.abspath(os.curdir).removesuffix(os.path.join('backend', 'src')), 'public')
app.config['BASE_URL'] = 'http://127.0.0.1:5000'
CORS(app)

backend = Backend(app.config['SECRET_KEY'], app.config['UPLOAD_FILE'], app.config['BASE_URL'])

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


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
            return jsonify({'message': 'Token is Expired !!'}), HTTPStatus.UNAUTHORIZED
        except Exception as e:
            return jsonify({'message': 'Token is invalid !!'}), HTTPStatus.UNAUTHORIZED

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
            return jsonify({'message': 'Token is Expired !!'}), HTTPStatus.UNAUTHORIZED
        except Exception as e:
            return jsonify({'message': 'Token is invalid !!'}), HTTPStatus.UNAUTHORIZED

        return f(current_user, *args, **kwargs)

    return decorated


def check_fields(data, fields):
    if not data:
        raise BadRequest("EXPECTED_DATA" + x.upper())
    for x in fields:
        if data.get(x) is None or data.get(x) == '':
            raise BadRequest("EXPECTED_" + x.upper())


def get_request_attached_file():
    if 'file' not in request.files:
        raise BadRequest("EXPECTED_FILE")
    file = request.files['file']
    if file.filename == '':
        raise BadRequest("EXPECTED_FILE")
    if not (file and is_file_type_allowed(file.filename)):
        raise BadRequest("EXPECTED_IMAGE")
    return file


def is_file_type_allowed(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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


@app.route('/order/<int:order_id>', methods=['GET'])
@normal_authorization
def get_order(current_user, order_id):
    try:
        did_success, message = backend.seller_manager.get_order_as_json_by_id(order_id)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify(message), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting order : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


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


@app.route('/customer/<int:customer_id>', methods=['GET'])
@normal_authorization
def get_customer(current_user, customer_id):
    try:
        did_success, message = backend.customer_manager.get_customer_as_json_by_id(customer_id)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify(message), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting customer : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/customer', methods=['POST'])
@admin_authorization
def add_customer(current_user):
    try:
        check_fields(request.json, ['name', 'phone_number', 'credit'])
        file = get_request_attached_file()
        link = backend.save_file(file, data['name'], 'customer')
        did_success, message = backend.customer_manager.add_customer(request.json, link)
        if not did_success:
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting customers : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/customer/<int:customer_id>', methods=['PUT'])
@admin_authorization
def edit_customer(current_user, customer_id):
    try:
        check_fields(request.json, ['name', 'phone_number', 'credit'])
        file = get_request_attached_file()
        link = backend.save_file(file, data['name'], 'customer')
        did_success, message = backend.customer_manager.edit_customer(customer_id, request.json, link)
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
    data = request.form
    try:
        check_fields(data, ['name', 'price', 'stock_number', 'category_id'])
        file = get_request_attached_file()
        link = backend.save_file(file, data['name'], 'product')
        did_success, message = backend.product_manager.add_product(data, link)
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
        file = get_request_attached_file()
        link = backend.save_file(file, data['name'], 'product')
        did_success, message = backend.product_manager.edit_product(product_id, request.json, link)
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


@app.route('/product/<int:product_id>', methods=['GET'])
@normal_authorization
def get_product(current_user, product_id):
    try:
        did_success, message = backend.product_manager.get_product_as_json_by_id(product_id)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify(message), HTTPStatus.OK
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


@app.route('/seller/<int:seller_id>', methods=['GET'])
@normal_authorization
def get_seller(current_user, seller_id):
    try:
        did_success, message = backend.seller_manager.get_seller_as_json_by_id(seller_id)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify(message), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting seller : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/seller', methods=['POST'])
@admin_authorization
def add_seller(current_user):
    try:
        check_fields(request.json, {'username', 'name', 'password'})
        file = get_request_attached_file()
        link = backend.save_file(file, data['name'], 'seller')
        did_success, message = backend.seller_manager.add_seller(request.json, link)
        if not did_success:
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while creating seller : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/seller/<int:seller_id>', methods=['PUT'])
@admin_authorization
def edit_seller(current_user, seller_id):
    try:
        check_fields(request.json, {'username', 'name', 'password'})
        file = get_request_attached_file()
        link = backend.save_file(file, data['name'], 'seller')
        did_success, message = backend.seller_manager.edit_account(seller_id, request.json, link)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.OK
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while updating seller : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/login', methods=['POST'])
def login():
    auth = request.json
    try:
        check_fields(auth, {'username', 'password'})
        return backend.security.authorize(auth)
    except BadRequest as e:
        return make_response(jsonify({'message': e.description}), HTTPStatus.BAD_REQUEST)


@app.route('/customer/<int:customer_id>', methods=['DELETE'])
@admin_authorization
def delete_customer(current_user, customer_id):
    try:
        did_success, message = backend.customer_manager.delete_customer(customer_id)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting customers : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/admin', methods=['PUT'])
@admin_authorization
def edit_admin(current_user):
    auth = request.json
    try:
        check_fields(auth, {'username', 'password'})
        did_success, message = backend.admin_manager.edit_admin(auth)
        replace_token = backend.security.create_token(auth.get('username'))
        if not did_success:
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message, 'replace_token': replace_token}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting admins : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/balance/<int:customer_id>', methods=['PUT'])
@admin_authorization
def edit_balance(current_user, customer_id):
    data = request.json
    try:
        check_fields(data, {'balance'})
        did_success, message = backend.customer_manager.edit_balance(customer_id, data)
        if not did_success:
            if message == 'NOT_EXIST':
                return jsonify({'message': message}), HTTPStatus.NOT_FOUND
            return jsonify({'message': message}), HTTPStatus.BAD_REQUEST

        return jsonify({'message': message}), HTTPStatus.CREATED
    except BadRequest as e:
        return jsonify({'message': f'{e.description}'}), HTTPStatus.BAD_REQUEST
    except Exception as e:
        return jsonify({'message': f'An error occurred while getting admins : {e}'}), HTTPStatus.INTERNAL_SERVER_ERROR


@app.route('/image/<string:kind>/<path:name>', methods=['GET'])
def get_image(kind, name):
    try:
        return send_from_directory(backend.get_image(kind), path=name, as_attachment=True)
    except FileNotFoundError:
        return jsonify({'message': 'FILE_NOT_FOUND'}), HTTPStatus.NOT_FOUND


if __name__ == "__main__":
    # setting debug to True enables hot reload
    # and also provides a debugger shell
    # if you hit an error while running the server
    app.run(debug=True)
