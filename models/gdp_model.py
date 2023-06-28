# this file create a model called GDP
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class GDP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(80), unique=True, nullable=False)
    country_code = db.Column(db.String(5), unique=True, nullable=False)
    indicator_name = db.Column(db.String(80), unique=True, nullable=False)
    indicator_code = db.Column(db.String(10), unique=True, nullable=False)
    year_2019 = db.Column(db.Numeric, unique=False, nullable=True)
    year_2020 = db.Column(db.Numeric, unique=False, nullable=True)
    year_2021 = db.Column(db.Numeric, unique=False, nullable=True)

