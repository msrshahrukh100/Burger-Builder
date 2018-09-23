import React from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedCompenent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null})
        return request
      }, error => {
        this.setState({
          error: error
        })
      })

      this.resInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({
          error: error
        })
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    hideErrorHandler = () => {
      this.setState({
        error: null,
      })
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error}
            purchaseCancelled={this.hideErrorHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedCompenent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
