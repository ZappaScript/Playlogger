from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import Flask, request, jsonify
from sqlalchemy import exc
from sqlalchemy.schema import Column
from sqlalchemy import JSON
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_cors import CORS
from report import *
import os
import argparse
import characteristicsExtractor as ce
import libctest as lt
app = Flask(__name__,static_folder='view/build')
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://juan:testtest@localhost/playlogger_db'


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    