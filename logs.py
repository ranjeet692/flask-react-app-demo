# This file sets looging configuration for the application.
from logging import LogRecord
from api import app, has_request_context, request, before_request, after_request
import logging

#logging configuration
logging.basicConfig(filename='logs/app.log', filemode='w', format='%(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class LogFormatter(logging.Formatter):
    def format(self, record: LogRecord) -> str:
        if has_request_context():
            record.url = request.url
            record.remote_addr = request.remote_addr
            record.method = request.method
        else:
            record.url = None
            record.remote_addr = None
            record.method = None

        return super().format(record)

formatter = LogFormatter(
    '[%(asctime)s] %(remote_addr)s requested %(url)s %(method)s %(levelname)s in %(module)s: %(message)s'
)   

handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
handler.setFormatter(formatter)
app.logger.addHandler(handler)

# before request
@app.before_request
def before_request_func():
    logger.info('Start request')

# after request
@app.after_request
def after_request_func(response):
    logger.info('End request')
    return response