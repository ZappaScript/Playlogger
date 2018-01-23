import { connect } from 'react-redux'
import { SET_CLIENTS, setClients } from '../actions.js'
import Clients from '../clients.js'

const getClients = (clients) => {
  return clients;
  }



const mapStateToProps = state => {
    console.log("return clients: getClients(state.clients)")
  return {
    clients: getClients(state.clients), getSearch : ()=>{return state.search}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setClients: (clients) => {
      dispatch(setClients(clients))
    }
  }
}

const clientsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients)

export default clientsContainer