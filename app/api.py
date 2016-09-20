from flask import Flask, Blueprint, jsonify, abort, make_response, request
from flask.ext.sqlalchemy import SQLAlchemy
from api_utility import MyValidator as Validator
from api_utility import model_dict, eq_type_dict
from app.diagnostic.models import EquipmentType, TestResult, Campaign, FluidProfile, Country
from app.diagnostic.models import ElectricalProfile
from app.users.models import User, Role
from collections import Iterable
from sqlalchemy import create_engine, MetaData
from flask.ext.blogging import SQLAStorage
from flask.ext.security import Security, SQLAlchemyUserDatastore
from flask.ext.security.utils import encrypt_password


api = Flask(__name__, static_url_path='/app/static')
api.config.from_object('config')
engine = create_engine(api.config['SQLALCHEMY_DATABASE_URI'])
db = SQLAlchemy(api, session_options={'autoflush': False})
api_blueprint = Blueprint('api_v1_0', __name__, url_prefix='/api/v1.0')
meta = MetaData()
sql_storage = SQLAStorage(engine, metadata=meta)
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(api, user_datastore)


# Accessory functions
def return_json(items_name, items_list):
    return jsonify({items_name: items_list})


def set_attrs_to_item(item, attr_dict):
    for k, v in attr_dict.items():
        try:
            setattr(item, k, v)
        except AttributeError:
            abort(500, "can't set attribute - {}: {}".format(k, v))


def get_model_by_path(path):
    return model_dict[path].get('model') or abort(500, 'Model missing')


def get_add_schema_by_path(path):
    return model_dict[path].get('schema') or abort(500, 'Validation schema missing')


def get_upd_schema_by_path(path):
    return model_dict[path].get('upd_schema') or get_add_schema_by_path(path)


# Verifications
def abort_if_not_validates(validation_schema, data_to_validate=None):
    if not data_to_validate:
        data_to_validate = request.json
    v = Validator(ignore_none_values=True)
    if not v.validate(data_to_validate, validation_schema):
        abort(400, v.errors)


def abort_if_json_missing():
    if not request.json:
        abort(400, 'JSON not found')


def abort_if_wrong_path(path):
    if path not in model_dict:
        abort(404)


def abort_if_wrong_id(item_id):
    if not item_id:
        abort(404)


# Standard CRUD functions
# Create
def add_item(path, param_dict):
    items_model = get_model_by_path(path)
    item = items_model()
    set_attrs_to_item(item, param_dict)
    try:
        db.session.add(item)
        db.session.commit()
    except Exception as e:
        abort(500, e.args)

    return item


# Read
def get_item(path, item_id):
    items_model = get_model_by_path(path)
    item = db.session.query(items_model).get(item_id) or abort(404)
    return item.serialize()


def get_items(path, args):
    items_model = get_model_by_path(path)
    if args:
        kwargs = {
            k: v for k,v in args.items() if hasattr(items_model, k)
                 or abort(400, 'Wrong attribute: {}'.format(k))
        }
        if items_model == Campaign and 'equipment_id' in kwargs:
            campaing_ids = {item.campaign_id for item in db.session.query(TestResult).filter_by(**kwargs)}
            return [item.serialize() for item in db.session.query(Campaign).filter(Campaign.id.in_(campaing_ids))]

        return [item.serialize() for item in db.session.query(items_model).filter_by(**kwargs)]
    return [item.serialize() for item in db.session.query(items_model).all()]


# Update
def update_item(path, item_id, data):
    abort_if_not_validates(get_upd_schema_by_path(path), data)
    item = db.session.query(get_model_by_path(path)).get(item_id)
    set_attrs_to_item(item, data)
    try:
        db.session.commit()
    except Exception as e:
        abort(500, e.args)

    return item.serialize()


# Delete
def delete_item(path, item_id):
    items_model = get_model_by_path(path)
    try:
        rows = db.session.query(items_model).filter(items_model.id == item_id).delete(synchronize_session=False)
    except:
        return False
    else:
        db.session.commit()
        return rows > 0


# Custom CRUD functions
# Add equipment and add related objects automaticaly
def add_equipment():
    path = 'equipment'
    abort_if_not_validates(get_add_schema_by_path(path))
    extra_fields_dict = request.json.pop('extra_fields', {})
    item = add_item(path, request.json)
    short_name = eq_type_dict.get(item.equipment_type_id, '')
    param_tree_dict = {
        'equipment_id': item.id,
        'parent_id': 32,
        'icon': '../app/static/img/icons/{0}_b.ico'.format(short_name),
        'type': '{0}'.format(short_name)
    }
    item_tree = add_item('tree', param_tree_dict)

    param_tree_trans_dict = {
        'id': item_tree.id,
        'locale': 'en',
        'text': item.name,
        'tooltip': item.name
        # 'text': param_dict['name'],
        # 'tooltip': param_dict['name']
    }
    add_item('tree_translation', param_tree_trans_dict)

    extra_table_name = item.equipment_type and item.equipment_type.table_name
    if extra_fields_dict:
        extra_fields_dict['equipment_id'] = item.id
        # abort_if_not_validates(get_add_schema_by_path(extra_table_name), extra_fields_dict)
        add_item(extra_table_name, extra_fields_dict)
    return item.id


# Get equipment upstreams and downstreams
def get_up_down_stream_of_equipment(item_id):
    path = 'equipment_connection'
    model = get_model_by_path(path)
    kwargs = {'equipment_id': item_id}
    upstream = [item.parent_id for item in db.session.query(model).filter_by(**kwargs)]
    kwargs = {'parent_id': item_id}
    downstream = [item.equipment_id for item in db.session.query(model).filter_by(**kwargs)]
    return {'upstream': upstream, 'downstream': downstream}


def add_up_down_stream_to_equipment(item_id):
    path = 'equipment_connection'
    upstream_list = request.json.get('upstream', [])
    for upstream_id in upstream_list:
        add_item(path, {'equipment_id': item_id, 'parent_id': upstream_id})

    downstream_list = request.json.get('downstream', [])
    for downstream_id in downstream_list:
        add_item(path, {'equipment_id': downstream_id, 'parent_id': item_id})

    return get_up_down_stream_of_equipment(item_id)


# Remove connection between equipment and its upstreams and downstreams
def delete_up_down_stream_of_equipment(item_id):
    path = 'equipment_connection'
    model = get_model_by_path(path)
    upstream = request.json.get('upstream', [])
    downstream = request.json.get('downstream', [])
    try:
        db.session.query(model)\
            .filter(model.parent_id.in_(upstream), model.equipment_id == item_id)\
            .delete(synchronize_session=False)
        db.session.query(model)\
            .filter(model.equipment_id.in_(downstream), model.parent_id == item_id)\
            .delete(synchronize_session=False)
    except:
        return False
    else:
        db.session.commit()
        return True


# Add a lot of test results
def add_items():
    path = 'test_result_equipment'
    abort_if_not_validates(get_add_schema_by_path(path))
    items_model = get_model_by_path(path)
    campaign_id = request.json.get('campaign_id')
    # TODO - deleting of all related test results IMHO isn't the best way
    # because of related to test results objects like tests
    try:
        db.session.query(items_model).filter(items_model.campaign_id == campaign_id).delete(synchronize_session=False)
    except:
        db.session.rollback()
    else:
        db.session.commit()

    equipment_ids = request.json.get('equipment_id')
    if not isinstance(equipment_ids, Iterable):
        equipment_ids = [equipment_ids]
    return [add_item(path, {'campaign_id':campaign_id, 'equipment_id':id}).id for id in equipment_ids]


def add_or_update_tests(path):
    items_model = get_model_by_path(path)
    items = []
    for test in request.json:
        if 'id' in test:
            item = db.session.query(items_model).get(test['id'])
        else:
            abort_if_not_validates(get_add_schema_by_path(path), test)
            item = add_item(path, test)

        items.append(item)
        set_attrs_to_item(item, test)

    try:
        db.session.commit()
    except Exception as e:
        abort(500, e.args)

    return [item.serialize() for item in items]


# Create user
def add_user():
    path = 'user'
    abort_if_not_validates(get_add_schema_by_path(path))
    items_model = get_model_by_path(path)
    item = items_model()
    role_id = request.json.pop("roles", None)
    if role_id:
        role = db.session.query(Role).filter(Role.id == role_id).first()
        item.roles = [role] if role else abort(400, {"roles": "invalid value"})

    item.password = encrypt_password(request.json["password"])
    country_id = request.json.get("country_id")
    if country_id:
        country_exists = db.session.query(db.exists().where(Country.id == country_id)).scalar()
        if not country_exists:
            abort(400, {"country_id": "invalid value"})

    set_attrs_to_item(item, request.json)
    try:
        db.session.add(item)
        db.session.commit()
    except Exception as e:
        abort(500, e.args)

    return item


# Get fields from corresponding table of specified equipment type
def get_equipment_type_fields(item_id):
    item = db.session.query(EquipmentType).get(item_id) or abort(404)
    return {str(c.name): str(c.type) for c in meta.tables[item.table_name].columns}


@api.errorhandler(404)
def not_found(error):
    return make_response(return_json('error', 'Not found'), 404)


@api.errorhandler(400)
def bad_request(error):
    return make_response(return_json('error', error.description), 400)


@api.errorhandler(500)
def internal_server_error(error):
    return make_response(return_json('error', error.description), 500)


# Standard routes
# Create
@api_blueprint.route('/<path>/', methods=['POST'])
def create_item_handler(path):
    abort_if_wrong_path(path)
    abort_if_json_missing()
    abort_if_not_validates(get_add_schema_by_path(path))
    return return_json('result', add_item(path, request.json).id)


# Read
@api_blueprint.route('/<path>/', methods=['GET'])
def read_items_handler(path):
    abort_if_wrong_path(path)
    return return_json('result', get_items(path, request.args))


@api_blueprint.route('/<path>/<int:item_id>', methods=['GET'])
def read_item_handler(path, item_id):
    abort_if_wrong_path(path)
    abort_if_wrong_id(item_id)
    return return_json('result', get_item(path, item_id))


# Update
@api_blueprint.route('/<path>/<int:item_id>', methods=['PUT', 'POST'])
def update_item_handler(path, item_id):
    abort_if_wrong_path(path)
    abort_if_wrong_id(item_id)
    abort_if_json_missing()
    return return_json('result', update_item(path, item_id, request.args))


# Delete
@api_blueprint.route('/<path>/<int:item_id>', methods=['DELETE'])
def delete_item_handler(path, item_id):
    abort_if_wrong_path(path)
    abort_if_wrong_id(item_id)
    return return_json('result', delete_item(path, item_id))


# Custom routes
# Get fields from corresponding table of specified equipment type
@api_blueprint.route('/equipment_type/<int:item_id>/fields', methods=['GET'])
def handler_equipment_type_fields(item_id):
    abort_if_wrong_id(item_id)
    return return_json('result', get_equipment_type_fields(item_id))


# Get fluid and electrical profiles in one responce
@api_blueprint.route('/test_profile/', methods=['GET'])
def get_test_profile():
    rows_fluid = db.session.query(FluidProfile).all()
    rows_electrical = db.session.query(ElectricalProfile).all()
    return return_json('result', [item.serialize() for rows in (rows_fluid, rows_electrical) for item in rows])


# Create equipment
@api_blueprint.route('/equipment/', methods=['POST'])
def create_equipment_handler():
    abort_if_json_missing()
    return return_json('result', add_equipment())


# Create equipment upstreams and downstreams
@api_blueprint.route('/equipment/<int:item_id>/up_down_stream/', methods=['POST'])
def create_equipment_up_down_stream_handler(item_id):
    abort_if_json_missing()
    return return_json('result', add_up_down_stream_to_equipment(item_id))


# Get equipment upstreams and downstreams
@api_blueprint.route('/equipment/<int:item_id>/up_down_stream/', methods=['GET'])
def read_equipment_up_down_stream_handler(item_id):
    return return_json('result', get_up_down_stream_of_equipment(item_id))


# Remove connection between equipment and its upstreams and downstreams
@api_blueprint.route('/equipment/<int:item_id>/up_down_stream/', methods=['DELETE'])
def delete_equipment_up_down_stream_handler(item_id):
    abort_if_json_missing()
    return return_json('result', delete_up_down_stream_of_equipment(item_id))


# Create a lot of test_results with equipment using one query
@api_blueprint.route('/test_result/equipment', methods=['POST'])
def handler_items():
    abort_if_json_missing()
    return return_json('result', add_items())


# Create or update a lot of tests
@api_blueprint.route('/test_result/multi/<path>', methods=['POST'])
def handler_tests(path):
    if path not in ('transformer_turn_ratio_test',
                    'winding_resistance_test',
                    'winding_test'):
        abort(404)
    abort_if_json_missing()
    return return_json('result', add_or_update_tests(path))


# Create user
@api_blueprint.route('/user/', methods=['POST'])
def create_user_handler():
    abort_if_json_missing()
    return return_json('result', add_user().id)


api.register_blueprint(api_blueprint)
