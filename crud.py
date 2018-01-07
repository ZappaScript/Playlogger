from schemas import *


# endpoint to create new user

@app.route("/cliente", methods=["POST"])
def add_client():
    rif = request.json['rif']
    razonSocial = request.json['razonSocial']
    nombre = request.json['nombre']
    
    
    new_user = cliente(rif,razonSocial,nombre)
    try:
        db.session.add(new_user)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        return "Database error"

    return jsonify(new_user)


@app.route("/tablas", methods=["GET"])
def print_tablas():
    toSend = {"tables": db.metadata.sorted_tables }
    return toSend


@app.route("/contrato", methods=["POST"])
def add_contrato():
    numeroCorrelativo = request.json['numeroCorrelativo']
    horasCompradas = request.json['horasCompradas']
    horasRestantes = request.json['horasCompradas']
    perteneceA = request.json['perteneceA']
    
    
    new_contrato = Contratos(numeroCorrelativo,horasCompradas,perteneceA)
    try:
        db.session.add(new_user)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        return "Database error"

    return jsonify(new_contrato)


@app.route("/orden", methods=["POST"])
def add_tOrder():
    contratoPadre = request.json['contratoPadre']
    numeroOrden = request.json['numeroOrden']
    tipoDeTransmision = request.json['tipoDeTransmision']
    horas = request.json['horas']
    inicio = request.json['inicio']
    final = request.json['final']
    
    
    new_user = User(username, email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        return "Database error"

    return jsonify(new_user)


@app.route("/user", methods=["POST"])
def add_user():
    username = request.json['username']
    email = request.json['email']
    
    new_user = User(username, email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except exc.IntegrityError:
        db.session.rollback()
        return "Database error"

    return jsonify(new_user)


# endpoint to show all users
@app.route("/user", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result.data)


# endpoint to get user detail by id
@app.route("/user/<id>", methods=["GET"])
def user_detail(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)


# endpoint to update user
@app.route("/user/<id>", methods=["PUT"])
def user_update(id):
    user = User.query.get(id)
    username = request.json['username']
    email = request.json['email']

    user.email = email
    user.username = username

    db.session.commit()
    return user_schema.jsonify(toSerialize = user.serialize())


# endpoint to delete user
@app.route("/user/<id>", methods=["DELETE"])
def user_delete(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)


if __name__ == '__main__':
    app.run(debug=True)