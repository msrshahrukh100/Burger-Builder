import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
  {label: 'Meat', type: 'meat'},
  {label: 'Salad', type: 'salad'},
  {label: 'Tomato', type: 'tomato'},
  {label: 'Cheese', type: 'cheese'}
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Total price is <strong>{props.totalPrice.toFixed(2)}</strong></p>
    {controls.map(ctrl =>
      <BuildControl
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        key={ctrl.label}
        label={ctrl.label}
        disabled={props.disabledInfo[ctrl.type]} />
    )}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >BUY NOW</button>
  </div>
)

export default buildControls
