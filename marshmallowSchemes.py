from schemas import ma
class ContratosSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('numeroCorrelativo', 'id_medio','horasCompradas','horasRestantes','perteneceA')

class ClientesSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = (  'rif', 'razonSocial','nombre')


class ordenesDeTransmisionSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('contratoPadre', 'numeroOrden','tipoDeTransmision','horas','inicio','final')

class MediaSchema(ma.Schema):
    class Meta:
        fields = ('id','nombre')
    

class EspecificacionSchema(ma.Schema):
    class Meta:
        fields = ('id','id_canal','tipo_transmision','costo_transmision','nombre','especificacion' )

class CanalSchema(ma.Schema): 
    class Meta:
        fields = ('id','id_medio','nombre')


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
media_schema = MediaSchema();
medias_schema = MediaSchema(many=True);
canal_schema = CanalSchema();
canales_schema = CanalSchema(many=True);
especificacion_schema = EspecificacionSchema();
especificaciones_schema = EspecificacionSchema(many=True);