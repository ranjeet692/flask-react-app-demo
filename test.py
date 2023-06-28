# This file contains unit tests for the application.
# Command to run the tests: python -m unittest test.py

import unittest
import os
from io import BytesIO
from api import app
from models.gdp_model import GDP, db

class TestGDP(unittest.TestCase):

    def setUp(self):
        with app.app_context():
            self.app = app
            self.client = self.app.test_client()
            self.app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///memory:')
            self.app.config['TESTING'] = True
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_upload(self):
        with app.app_context():
            # create a csv file
            csv = 'country,country_code,indicator_name,indicator_code,year_2019,year_2020,year_2021\nIndia,IND,GDP,123,100,200,300'
            # convert the csv to bytes
            csv = BytesIO(csv.encode())
            # post the csv file to the upload route
            response = self.client.post('/api/upload', content_type='multipart/form-data', data={'file': (csv, 'test.csv')})
            # check if the response is 200
            self.assertEqual(response.status_code, 200)
            # check if the database is not empty
            #self.assertNotEqual(db.query.all(), [])

    # test modify gdp record
    def test_modify_gdp(self):
        with app.app_context():
            # create a gdp record
            gdp = GDP(country='India', country_code='IND', indicator_name='GDP', indicator_code='123', year_2019=100, year_2020=200, year_2021=300)
            # add the gdp record to the database
            db.session.add(gdp)
            # commit the changes
            db.session.commit()
            # modify the gdp record
            gdp.year_2019 = 200
            # update the gdp record
            db.session.update(gdp)
            # commit the changes
            db.session.commit()
            # check if the gdp record is modified
            self.assertEqual(gdp.year_2019, 200)

if __name__ == '__main__':
    unittest.main()
