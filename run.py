# Description: This file contains the code for the flask application
# Author: Ranjeet Kumar
# Date: 28/06/2023
# Version: 1.0
# Python Version: 3.9.5
# Command to run the application: python run.py

from api import app

if __name__ == "__main__":
    app.run(debug=True, port=8000)