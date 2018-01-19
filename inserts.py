from schemas import *


def inserts_clients():

    toAdd = [Clientes( rif = 1234567890, razonSocial="RazonSocial1", nombre="Nombre2"),
    Clientes( rif = 1234567891, razonSocial="RazonSocial1", nombre="Nombre2"),
    Clientes( rif = 1234567892, razonSocial="RazonSocial1", nombre="Nombre2"),
    Clientes( rif = 1234567893, razonSocial="RazonSocial1", nombre="Nombre2")]
    
    for cliente in toAdd :
        db.session.add(cliente)

    toAdd = [Contratos( numeroCorrelativo = 1234567890, horasCompradas="100", horasRestantes="100", perteneceA = "1234567890"),
    Contratos( numeroCorrelativo = 1234567891, horasCompradas="100", horasRestantes="100", perteneceA = "1234567890"),
    Contratos( numeroCorrelativo = 1234567892, horasCompradas="100", horasRestantes="100", perteneceA = "1234567890"),
    Contratos( numeroCorrelativo = 1234567893, horasCompradas="100", horasRestantes="100", perteneceA = "1234567890")]
    
    for cliente in toAdd :
        db.session.add(cliente)

    print (Clientes.query.filter_by(rif="1234567890"))
    print (Contratos.query.filter_by(numeroCorrelativo = "1234567890"))

    db.session.query(Clientes).filter_by(rif="1234567890")