
export const SET_CLIENTS = 'SET_CLIENTS'
export const SET_CONTRACTS= 'SET_CONTRACTS'
export const SET_ORDERS = 'SET_ORDERS'
export const SET_LOADED = 'SET_LOADED'
export const SET_MEDIAS = 'SET_MEDIAS'
export const SET_CANALES = 'SET_CANALES'
export const SET_ESPECIFICACIONES = 'SET_ESPECIFICACIONES'
export const UPDATE_CONTRACT ='UPDATE_CONTRACT'
export const UPDATE_ORDER ='UPDATE_ORDER'
export const UPDATE_CLIENT ='UPDATE_CLIENT'
export const SET_SEARCH = 'SET_SEARCH'
export const ADD_CONTRACT = 'ADD_CONTRACT'
export const ADD_CLIENT = 'ADD_CLIENT'
export const ADD_ORDER = 'ADD_ORDER'

export function setClients(clients) {
    console.log("setClients:" ,clients)
    return { type: SET_CLIENTS, clients}

}

export function setContracts(contracts) {
    console.log("setContracts:" ,contracts)
    return { type: SET_CONTRACTS, contracts }

}

export function setOrders(orders) {
    console.log("setOrders:" ,orders)
    return { type: SET_ORDERS, orders }

}

export function setMedias(medias) {
    
    return { type: SET_MEDIAS, medias }

}

export function setCanales(canales) {
    
    return { type: SET_CANALES, canales }

}

export function setEspecificaciones(especificaciones) {
    
    return { type: SET_ESPECIFICACIONES, especificaciones }

}


export function setLoaded(loaded){

    return { type: SET_LOADED, loaded }

}

export function setSearch(searchString){
    console.log("setSearch", searchString)
    return { type: SET_SEARCH, searchString }

}

export function addClient(client){
    console.log ( "At actions.js addClient, I got:", client)
return {type: ADD_CLIENT,client}

}
export function addContract(contract){
   
    return {type:ADD_CONTRACT, contract}

}
export function addOrder(order){
    return{type:ADD_ORDER,order}

}

export function updateClient(client){
    return {type:UPDATE_CLIENT,client}

}
export function updateContract(contract){
    return {type:UPDATE_CONTRACT,contract}

}
export function updateOrder(order){
    return {type:UPDATE_ORDER,order}

}