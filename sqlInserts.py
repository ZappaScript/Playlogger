from schemas import *




inserts_Media = [ Media(nombre='A&E'),Media(nombre='PBS'),Media(nombre='CBS'),Media(nombre='HBO'),Media(nombre='Max')   ]

for toInsert in inserts_Media:
    db.session.add(toInsert)



insert_Channels = [Canal(id_medio=1,nombre='A&E Family'),Canal(id_medio=2,nombre='PBS'),Canal(id_medio=2,nombre='PBS Kids'),Canal(id_medio=3,nombre='CBS Sport'),Canal(id_medio=3,nombre='CBS News'),Canal(id_medio=4,nombre='HBO Signature'),Canal(id_medio=4,nombre='HBO Family'),Canal(id_medio=4,nombre='HBO East'), Canal(id_medio=5,nombre='Max Prime'),Canal(id_medio=5,nombre='Max Prime')]

for toInsert in insert_Channels
    db.session.add(toInsert)



inserts_Specifics = [EspecificacionOrden(id_canal =1,  tipo_transmision='rotativo', costo_transmision=1200, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =1,  tipo_transmision='selectivo', costo_transmision=12000, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =2,  tipo_transmision='rotativo', costo_transmision=1320, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =2,  tipo_transmision='selectivo', costo_transmision=13200, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =3,  tipo_transmision='rotativo', costo_transmision=1000, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =3,  tipo_transmision='selectivo', costo_transmision=10000, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =4,  tipo_transmision='rotativo', costo_transmision=1250, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =5,  tipo_transmision='selectivo', costo_transmision=12500, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =5,  tipo_transmision='rotativo', costo_transmision=1200, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =6,  tipo_transmision='selectivo', costo_transmision=12000, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =6,  tipo_transmision='rotativo', costo_transmision=1320, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =7,  tipo_transmision='selectivo', costo_transmision=13200, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =7,  tipo_transmision='rotativo', costo_transmision=1000, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =8,  tipo_transmision='selectivo', costo_transmision=10000, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =8,  tipo_transmision='rotativo', costo_transmision=1250, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =9,  tipo_transmision='selectivo', costo_transmision=12500, nombre='Selectiva primetime')
    EspecificacionOrden(id_canal =9,  tipo_transmision='rotativo', costo_transmision=1200, nombre='Rotativa primetime'),
    EspecificacionOrden(id_canal =10,  tipo_transmision='selectivo', costo_transmision=12000, nombre='Selectiva primetime'),
    EspecificacionOrden(id_canal =10,  tipo_transmision='rotativo', costo_transmision=1320, nombre='Rotativa primetime')]

for toInsert in inserts_Specifics:
    db.session.add(toInsert)