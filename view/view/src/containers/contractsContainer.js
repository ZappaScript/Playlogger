import { connect } from 'react-redux'
import { SET_CONTRACTS, setContracts } from '../actions.js'
import Contracts from '../contracts.js'

const getContracts = (contracts) => {
  return contracts;
  }



const mapStateToProps = state => {
    
  return {
    contracts: getContracts(state.contracts)
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