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

app = Flask(__name__,static_folder='view/build')
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
##app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://juan:testtest@localhost/playlogger_db'

db = SQLAlchemy(app)
ma = Marshmallow(app)
db.create_all()


class Media (db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(64))
    def __repr__(self):
        return '<idMedio {}>'.format(self.id)

class Canal(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    id_medio = db.Column(db.Integer,db.ForeignKey('media.id'))
    nombre = db.Column(db.String(64))

class EspecificacionOrden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_canal = db.Column(db.Integer, db.ForeignKey('canal.id'))
    tipo_transmision = db.Column(db.String(64))
    costo_transmision = db.Column(db.Integer)
    nombre = db.Column(db.String(64))
    especificacion = db.Column(db.Text)




class Contratos(db.Model):
    
    numeroCorrelativo = db.Column(db.Integer, primary_key=True)
    id_medio = db.Column(db.Integer, db.ForeignKey('media.id'))
    horasCompradas = db.Column(db.Integer)
    horasRestantes = db.Column(db.Integer)
    perteneceA = db.Column(db.String(10))
    def __repr__(self):
        return '<numeroCorrelativo {}>'.format(self.numeroCorrelativo)

    
class ordenesDeTransmision(db.Model):
    
    contratoPadre = db.Column(db.Integer, db.ForeignKey('contratos.numeroCorrelativo'),primary_key= True)
    numeroOrden = db.Column(db.Integer, primary_key= True)
    ##tipoDeTransmision = db.Column(db.String(120))
    tipoDeTransmision = db.Column(db.Integer, db.ForeignKey ('especificacion_orden.id') )
    horas = db.Column(db.Integer)
    inicio = db.Column(db.Date)
    final = db.Column(db.Date)
    ##detalles = db.Column(JSON)
    detalles = db.Column(db.Text)
    def __repr__(self):
        return '<numeroOrden {}>'.format(self.numeroOrden)



class Clientes(db.Model):
    rif = db.Column(db.String(10), primary_key=True)
    razonSocial = db.Column(db.String(120))
    nombre = db.Column (db.String(120))
    def __repr__(self):
        return '<rif {}>'.format(self.rif)
