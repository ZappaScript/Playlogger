
export const SET_CLIENTS = 'SET_CLIENTS'
export const SET_CONTRACTS= 'SET_CONTRACTS'
export const SET_ORDERS = 'SET_ORDERS'


export function setClients(clients) {

    return { type: SET_CLIENTS, clients}

}

export function setContracts(contracts) {

    return { type: SET_CONTRACTS, contracts }

}

export function queryOrders(orders) {

    return { type: SET_ORDERS, orders }

}