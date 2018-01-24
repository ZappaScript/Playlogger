import { connect } from 'react-redux'
import { setContracts } from '../actions.js'
import Contracts from '../contracts.js'

const getContracts = (contracts) => {
  return contracts;
  }



const mapStateToProps = state => {
    
  return {
    contracts: getContracts(state.contracts), getSearch : ()=>{return state.search}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setContracts: (contracts) => {
      dispatch(setContracts(contracts))
    }
  }
}

const contractsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Contracts)

export default contractsContainer;