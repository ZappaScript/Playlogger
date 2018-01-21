from schemas import *
import random

def inserts_clients():

    toAdd = [Clientes( rif = "123456789J", razonSocial="RazonSocial1", nombre="Nombre2"),
    Clientes( rif = "123456780J", razonSocial="RazonSocial1", nombre="Nombre2"),
    Clientes( rif = "123456781J", razonSocial="RazonSocial1", nombre="Nombre2"),
    Clientes( rif = "123456782J", razonSocial="RazonSocial1", nombre="Nombre2")]
    
    for cliente in toAdd :
        db.session.add(cliente)

    toAdd = [Contratos( numeroCorrelativo = 1234567890, horasCompradas="100", horasRestantes="100", perteneceA = "123456789J"),
    Contratos( numeroCorrelativo = 1234567891, horasCompradas="100", horasRestantes="100", perteneceA = "123456789J"),
    Contratos( numeroCorrelativo = 1234567892, horasCompradas="100", horasRestantes="100", perteneceA = "123456782J"),
    Contratos( numeroCorrelativo = 1234567893, horasCompradas="100", horasRestantes="100", perteneceA = "123456781J")]
    
    for cliente in toAdd :
        db.session.add(cliente)

   
    toAddContratos = []
    for i in range(1,1000):
        cP = int(random.uniform(0, len(toAdd)))
        idOrden = len(list(filter(lambda x: x.contratoPadre == toAdd[cP].numeroCorrelativo, toAddContratos))) + 1
        toAddContratos.append(ordenesDeTransmision( contratoPadre = toAdd[cP].numeroCorrelativo, numeroOrden = idOrden, tipoDeTransmision = 'Rotativo, selectivo, otros', horas=100, inicio=100,final=100))
    
    toAddContratos = sorted(toAddContratos, key=lambda x: x.contratoPadre)
    for orden in toAddContratos:
        db.session.add(orden)