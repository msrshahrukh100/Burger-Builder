import React from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {
  componentWillUpdate() {
    console.log("updateing")
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.show !== this.props.show) || (this.props.children !== nextProps.children)
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} click={this.props.purchaseCancelled} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : 0
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal
