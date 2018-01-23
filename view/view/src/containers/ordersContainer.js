import { connect } from 'react-redux'
import { SET_ORDERS, setOrders } from '../actions.js'
import Orders from '../orders.js'

const getOrders = (orders) => {
  return orders;
  }



const mapStateToProps = state => {
    
  return {
    orders: getOrders(state.orders), getSearch : ()=>{return state.search}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setorders: (orders) => {
      dispatch(setOrders(orders))
    }
  }
}

const ordersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders)

export default ordersContainer;