from schemas import ma
class ContratosSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('numeroCorrelativo', 'horasCompradas','horasRestantes','perteneceA')

class ClientesSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = (  'rif', 'razonSocial','nombre')


class ordenesDeTransmisionSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('contratoPadre', 'numeroOrden','tipoDeTransmision','horas','inicio','final')


class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('username', 'email')


client_schema = ClientesSchema()
clients_schema = ClientesSchema(many=True)
user_schema = UserSchema()
users_schema = UserSchema(many=True)
contrato_schema = ContratosSchema()
contratos_schema = ContratosSchema(many=True)
orden_schema= ordenesDeTransmisionSchema()
ordenes_schema= ordenesDeTransmisionSchema(many=True)