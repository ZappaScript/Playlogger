from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import Flask, request, jsonify
from sqlalchemy import exc
from sqlalchemy.schema import Column
from sqlalchemy import JSON
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_cors import CORS
import os

app = Flask(__name__,static_folder='view/build')
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
##app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://juan:testtest@localhost/playlogger_db'

db = SQLAlchemy(app)
ma = Marshmallow(app)
db.create_all()

class Contratos(db.Model):
    
    numeroCorrelativo = db.Column(db.Integer, primary_key=True)
    horasCompradas = db.Column(db.Integer)
    horasRestantes = db.Column(db.Integer)
    perteneceA = db.Column(db.String(10))
    def __repr__(self):
        return '<numeroCorrelativo {}>'.format(self.numeroCorrelativo)

class ordenesDeTransmision(db.Model):
    
    contratoPadre = db.Column(db.Integer, db.ForeignKey('contratos.numeroCorrelativo'),primary_key= True)
    numeroOrden = db.Column(db.Integer, primary_key= True)
    tipoDeTransmision = db.Column(db.String(120))
    horas = db.Column(db.Integer)
    inicio = db.Column(db.Date)
    final = db.Column(db.Date)
  ##  detalles = db.Column(JSON)
    detalles = db.Column(db.Text)
    def __repr__(self):
        return '<numeroOrden {}>'.format(self.numeroOrden)



class Clientes(db.Model):
    rif = db.Column(db.String(10), primary_key=True)
    razonSocial = db.Column(db.String(120))
    nombre = db.Column (db.String(120))
    def __repr__(self):
        return '<rif {}>'.format(self.rif)
