import time
from flask import Flask
from datetime import datetime,timedelta
import random

app = Flask(__name__)

def gen_timeSeries_data(start_time=None, end_time=None):
    if not start_time:
        start_time = datetime.today() - timedelta(days=365)
    if not end_time:
        end_time = datetime.today()
    out = []
    while start_time <= end_time:
        key = start_time.strftime("%Y-%m-%d")
        value = random.randint(100,1000)

        out.append({'key': key, 'value': value, 'lowerbound': 200, 'upperbound': 800})
        start_time = start_time + timedelta(days=1)
    return out

@app.route('/')
def get_hello():
    return {'msg': "Hello!!"}

@app.route('/timeseries')
def get_time_series():
    data = gen_timeSeries_data()
    return {'data': data}
