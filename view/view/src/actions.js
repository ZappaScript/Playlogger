
export const SET_CLIENTS = 'SET_CLIENTS'
export const SET_CONTRACTS= 'SET_CONTRACTS'
export const SET_ORDERS = 'SET_ORDERS'
export const SET_LOADED = 'SET_LOADED'
export const SET_SEARCH = 'SET_SEARCH'

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

export function setLoaded(loaded){

    return { type: SET_LOADED, loaded }

}

export function setSearch(searchString){
    console.log("setSearch", searchString)
    return { type: SET_SEARCH, searchString }

}