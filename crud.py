from schemas import *
from marshmallowSchemes import *


# endpoint to create new user



#def generate_schedule(**descriptor):
 #   if descriptor["tipo"] == "rotativo"

  #  if descriptor["tipo"] == "selectivo"
   #     numero = descriptor["numero"]
    #    horaInicio = descriptor["horaInicio"]
     #   horaFinal = descriptor["horaFinal"]



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if(path == ""):
        return send_from_directory('view/build', 'index.html')
    else:
        if(os.path.exists("view/build/" + path)):
            return send_from_directory('view/build', path)
        else:
            return send_from_directory('view/build', 'index.html')

@app.route("/tablas", methods=["GET"])
def print_tablas():
    toSend = {"tables": db.metadata.sorted_tables }
    return toSend

# endpoint to show all users


@app.route("/ordenes", methods=["GET"])
def get_ordenes():
    all_ordenes = ordenesDeTransmision.query.all()
    result = ordenes_schema.dump(all_ordenes)
    return jsonify(result.data)

@app.route("/contratos", methods=["GET"])
def get_contratos():
    all_contratos = Contratos.query.all()
    result = contratos_schema.dump(all_contratos)
    return jsonify(result.data)
    
@app.route("/contrato/<nCorrelativo>", methods=["GET"])
def get_contrato_by(nCorrelativo):
    
    contrato = Contratos.query.filter_by(numeroCorrelativo=nCorrelativo)
    result = contratos_schema.dump(contrato)
    return jsonify(result.data)
    
@app.route("/cliente/<string:nRif>", methods=["GET"])
def get_cliente_by(nRif):
    
    ##client = Clientes.query.filter_by(rif = nRif).one()
    client = Clientes.query.get(nRif)
    result = client_schema.dump(client)
    return jsonify(result.data)

@app.route("/clientes", methods=["GET"])
def get_clientes():
    all_Clients = Clientes.query.all()
    result = clients_schema.dump(all_Clients)
    return jsonify(result.data)


@app.route("/contrato", methods=["POST"])
def add_contrato():
    jsonData = request.get_json()
    numeroCorrelativo = jsonData['numeroCorrelativo']
    horasCompradas = jsonData['horasCompradas']
    horasRestantes = jsonData['horasCompradas']
    perteneceA = jsonData['perteneceA']
    
    
    new_contrato= Contratos(numeroCorrelativo=numeroCorrelativo,horasCompradas=horasCompradas,horasRestantes=horasRestantes,perteneceA=perteneceA)
    try:
        db.session.add(new_contrato)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(e)

    return jsonify(contrato_schema.dump(new_contrato))


@app.route("/orden", methods=["POST"])
def add_tOrder():
    contratoPadre = request.json['contratoPadre']
    numeroOrden = request.json['numeroOrden']
    tipoDeTransmision = request.json['tipoDeTransmision']
    horas = request.json['horas']
    inicio = request.json['inicio']
    final = request.json['final']

    new_order = ordenesDeTransmision(contratoPadre,numeroOrden,tipoDeTransmision, horas,inicio, final)
    try:
        db.session.add(new_order)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(e)

    return jsonify(new_order)


@app.route("/user", methods=["POST"])
def add_user():
    return "this shouldn't exist"

@app.route("/cliente", methods=["POST"])
def add_client():
    jsonData = request.get_json()
    print(jsonData )
    rif = jsonData['rif']
    razonSocial = jsonData['razonSocial']
    nombre = jsonData['nombre']
    new_client = Clientes(rif=rif,razonSocial=razonSocial,nombre=nombre)
    try:
        db.session.add(new_client)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(e)

    return jsonify(client_schema.dump(new_client))


if __name__ == '__main__':
    app.run(debug=True)