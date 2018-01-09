from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import Flask, request, jsonify
from sqlalchemy import exc
from sqlalchemy.schema import Column
from sqlalchemy.orm import sessionmaker, scoped_session
from flask_cors import CORS
import os

app = Flask(__name__,static_folder='view/build')
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'crud.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Clientes(db.Model):
    
    razonSocial = db.Column(db.String)
    rif = db.Column(db.String(10), primary_key=True)
    nombre = db.Column (db.String(120))

    def __init__(self, razonSocial, rif, nombre):
        self.razonSocial = razonSocial
        self.rif = rif
        self.nombre = nombre
    def serialize(self):
        return {
            'razonSocial': self.razonSocial,
            'rif': self.rif,
            'nombre': self.nombre
        }

class Contratos(db.Model):
    
    numeroCorrelativo = db.Column(db.Integer, primary_key=True)
    horasCompradas = db.Column(db.Integer)
    horasRestantes = db.Column(db.Integer)
    perteneceA = db.Column(db.String(10),db.ForeignKey('clientes.rif'))

    def __init__(self,numeroCorrelativo,horasCompradas,perteneceA):
        self.numeroCorrelativo = numeroCorrelativo
        self.horasCompradas = horasCompradas
        self.horasRestantes = horasCompradas
        self.perteneceA = perteneceA
    def serialize(self):
        return {
            'numeroCorrelativo': self.numeroCorrelativo,
            'horasCompradas': self.horasCompradas,
            'horasRestantes': self.horasRestantes,
            'perteneceA': self.perteneceA
        }

class ordenesDeTransmision(db.Model):
    
    contratoPadre = db.Column(db.Integer, db.ForeignKey('contratos.numeroCorrelativo'),primary_key= True)
    numeroOrden = db.Column(db.Integer, primary_key= True)
    tipoDeTransmision = db.Column(db.String)
    horas = db.Column(db.Integer)
    inicio = db.Column(db.Integer)
    final = db.Column(db.Integer)
    


    def __init__(self,contratoPadre,numeroOrden,tipoDeTransmision,horas,inicio,final):
        self.contratoPadre = contratoPadre
        self.numeroOrden = numeroOrden
        self.tipoDeTransmision = tipoDeTransmision
        self.horas = horas
        self.inicio = inicio
        self.final = final
    def serialize(self):
        return {
            'contratoPadre': self.contratoPadre,
            'numeroOrden': self.numeroOrden,
            'tipoDeTransmision': self.tipoDeTransmision,
            'horas': self.horas,
            'inicio': self.inicio,
            'final': self.final
        }




