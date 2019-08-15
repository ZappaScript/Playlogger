from schemas import *
from marshmallowSchemes import *

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if(path == ""):
        return send_from_directory('view/build', 'index.html')
        print(request)
    else:
        if(os.path.exists("view/build/" + path)):
            print(request)
            return send_from_directory('view/build', path)
        else:
            print(request)
            return send_from_directory('view/build', 'index.html')

@app.route("/tablas", methods=["GET"])
def print_tablas():
    toSend = {"tables": db.metadata.sorted_tables }
    return toSend


@app.route("/getpdf/<orden>", methods=["GET"])
def get_ordenPDF(orden):
    if(os.path.exists( orden+'.pdf')):
        print(request)
        return send_from_directory('', orden+'.pdf')

# endpoint to show all users


@app.route("/ordenes", methods=["GET"])
def get_ordenes():
    all_ordenes = ordenesDeTransmision.query.all()
    result = ordenes_schema.dump(all_ordenes)
    return jsonify(result.data)

@app.route("/contratos", methods=["GET"])
def get_contratos():
    all_contratos = Contratos.query.all()
    for contrato in all_contratos:
        collection = db.session.query(ordenesDeTransmision.horas).filter(ordenesDeTransmision.contratoPadre == contrato.numeroCorrelativo).all()
        horasRestantes = contrato.horasCompradas
        for col in collection:
            horasRestantes-= col.horas
        contrato.horasRestantes = horasRestantes

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
    all = Clientes.query.all()
    result = clients_schema.dump(all)
    return jsonify(result.data)

@app.route("/medios", methods=["GET"])
def get_medios():
    all = Media.query.all()
    result = medias_schema.dump(all)
    return jsonify(result.data)

@app.route("/canales", methods=["GET"])
def get_canales():
    all = Canal.query.all()
    result = canales_schema.dump(all)
    return jsonify(result.data)

@app.route("/especificaciones", methods=["GET"])
def get_especificaciones():
    all = EspecificacionOrden.query.all()
    result = especificaciones_schema.dump(all)
    return jsonify(result.data)



@app.route("/contrato", methods=["POST"])
def add_contrato():
    data = request.get_json()
    print(data)
    
    new_contrato= Contratos(numeroCorrelativo=data['numeroCorrelativo'],
                            id_medio= data['id_medio'], 
                            horasCompradas=data['horasCompradas'],
                            horasRestantes=data['horasCompradas'],
                            perteneceA=data['perteneceA'])
    try:
        db.session.add(new_contrato)
        db.session.commit()
        return jsonify("OK 200")
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(e.args) ##Must find a way to return a more specific error

    return jsonify(contrato_schema.dump(new_contrato))



@app.route("/pdfpreview", methods=["POST"])
def order_Preview():
    
    data = request.get_json()
    
    
    data['datosCanal']=Canal.query.get(data["id_canal"])
    data['datosEspecificacion'] = EspecificacionOrden.query.get(data['id_especificacion'])
    
    pdfData = previewPDF(data)
    
    response = make_response(pdfData)
    response.headers.set('Content-Disposition', 'attachment', filename='preview' + '.pdf')
    response.headers.set('Content-Type', 'application/pdf')

    
    return response
    



@app.route("/update/<opt>", methods=["POST"])
def update_row(opt):
    data = request.get_json()
    if(opt == 'cliente' ):
        
        foobar = db.session.query(Clientes).get(data['rif'])
        
        for key, value in data.items():
        
            setattr(foobar, key, value)

    
    if(opt == 'contrato' ):
        foobar = db.session.query(Contratos).get(data['numeroCorrelativo'])
        
        for key, value in data.items():
        
            setattr(foobar, key, value)

       
    if(opt == 'orden' ):
        print(data)
        foobar = db.session.query(ordenesDeTransmision).get((data['contratoPadre'],data['numeroOrden']))
        
        foobar.contratoPadre=data['contratoPadre']
        foobar.numeroOrden=data['numeroOrden']
        foobar.tipoDeTransmision=data['tipoDeTransmision']
        foobar.horas=data['horas']
        foobar.inicio=data['inicio']
        foobar.final=data['final']
        foobar.detalles=str(data['detalles'])
    try:
        
        db.session.commit()
        db.session.flush()
        return jsonify("OK 200")
    except exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(e.args) ##Must find a way to return a more specific error    
        
        
            

        

@app.route("/orden", methods=["POST"])
def add_tOrder():
    data = request.get_json()
    data['datosCanal']=Canal.query.get(data["id_canal"])
    data['datosEspecificacion'] = EspecificacionOrden.query.get(data['id_especificacion'])
    
    pdfData = renderPDF(data)
    new_order = ordenesDeTransmision()
    print('This is what I get in /orden post',data)
    
    try:
        db.session.add(ordenesDeTransmision(
            contratoPadre=data['contratoPadre'],
            numeroOrden=data['numeroOrden'],
            tipoDeTransmision=data['id_especificacion'], 
            horas=data['horas'],
            inicio=data['inicio'], 
            final=data['final'],
            detalles=str(data['detalles'])
            ))
        db.session.commit()
        return jsonify("Succes")
    except exc.IntegrityError as e:
        db.session.rollback()
        print("e.message",e.message)
        return jsonify(e.orig)

    


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



@app.route("/media", methods=["POST"])
def add_media():
    data = request.get_json()
    
    try:
        db.session.add( Media( nombre =data['nombre'] ) )
        db.session.commit()
        return jsonify("Success")
    except exc.IntegrityError as e:
        db.session.rollback()
        print("e.message",e.message)
        return jsonify(e.orig)

@app.route("/canal", methods=["POST"])
def add_canal():
    data = request.get_json()
    try:
        db.session.add(Canal(id_medio = data['id_medio'],nombre = data['nombre']))
        db.session.commit()
        return jsonify("Succes")
    except exc.IntegrityError as e:
        db.session.rollback()
        print("e.message",e.message)
        return jsonify(e.orig)

@app.route("/especificacion", methods=["POST"])
def add_especificacion():
    data = request.get_json()
    try:
        db.session.add(EspecificacionOrden(id_canal = data['id_canal'],tipo_transmision= data['tipo_transmision'],costo_transmision = data['costo_transmision'], nombre = data['nombre'], especificacion = data['especificacion'] ))
        db.session.commit()
        return jsonify("Succes")
    except exc.IntegrityError as e:
        db.session.rollback()
        print("e.message",e.message)
        return jsonify(e.orig)



if __name__ == '__main__':
    app.run(debug=True)