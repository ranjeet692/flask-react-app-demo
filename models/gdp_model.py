# this file create a model called GDP
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class GDP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(80), unique=False, nullable=False)
    country_code = db.Column(db.String(10), unique=False, nullable=False)
    indicator_name = db.Column(db.String(80), unique=False, nullable=False)
    indicator_code = db.Column(db.String(80), unique=False, nullable=False)
    year_2019 = db.Column(db.Numeric, unique=False, nullable=True)
    year_2020 = db.Column(db.Numeric, unique=False, nullable=True)
    year_2021 = db.Column(db.Numeric, unique=False, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'country': self.country,
            'country_code': self.country_code,
            'indicator_name': self.indicator_name,
            'indicator_code': self.indicator_code,
            'year_2019': float(self.year_2019) if self.year_2019 else None,
            'year_2020': float(self.year_2020) if self.year_2020 else None,
            'year_2021': float(self.year_2021) if self.year_2021 else None
        }

