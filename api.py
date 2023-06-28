# Description: This file contains the API for the application.

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from models.gdp_model import db, GDP
import pandas as pd
import os

app = Flask(__name__, static_folder='frontend/build')

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///memory:')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)

# allowed file extensions
ALLOWED_EXTENSIONS = {'csv'}
app.config['ALLOWED_EXTENSIONS'] = ALLOWED_EXTENSIONS

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# defalut route for the application, this should open the index page from frontend/build folder
@app.route('/')
def index():
    app.logger.info('Index page')
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    app.logger.info('Static proxy')
    return send_from_directory(app.static_folder, path)

# upload data
@app.route('/api/upload', methods=['POST'])
@cross_origin(origin='*')
def upload_file():
    # read the csv file
    df = pd.read_csv(request.files.get('file'))
    
    #bulk insert the data into the database
    db.session.bulk_insert_mappings(GDP, df.to_dict(orient="records"))
    db.session.commit()
    
    return jsonify({'message': 'Data uploaded successfully'})

# get paginated data
@app.route('/api/gdp', methods=['GET'])
def get_gdp():
    if request.method == 'GET':
        # get the page and limit query parameters
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        # get the data from database
        gdp = db.query.paginate(page=page, per_page=limit)
        # convert the data to json format
        result = [gdp.to_json() for gdp in gdp.items]
        return jsonify(result)
    
# get data by country_code
@app.route('/api/gdp/<country_code>', methods=['GET'])
def get_gdp_by_country(country_code):
    if request.method == 'GET':
        # get the data from database
        gdp = db.query.filter_by(country_code=country_code).first()
        # convert the data to json format
        result = gdp.to_json()
        return jsonify(result)
    
# modify data by id
@app.route('/api/gdp/<id>', methods=['PUT'])
def modify_gdp(id):
    if request.method == 'PUT':
        # get the data from database
        gdp = db.query.filter_by(id=id).first()
        # update the data
        gdp.year_2019 = request.json['year_2019']
        gdp.year_2020 = request.json['year_2020']
        gdp.year_2021 = request.json['year_2021']
        # commit the changes
        db.session.commit()
        return jsonify({'message': 'Data updated successfully'})