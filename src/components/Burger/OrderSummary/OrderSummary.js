import React from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredients = props.ingredients
  const summary = Object.keys(ingredients)
    .map(igKey => (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span> - {ingredients[igKey]}
      </li>
    ))

  return (
    <div>
      Your tasty burger has the following ingredients
      <ul>
        {summary}
      </ul>
      <strong>Total price is {props.price.toFixed(2)}</strong>
      <div>
        <Button click={props.cancelled} type='Danger'>Cancel</Button>
        <Button click={props.continued} type='Success'>Continue</Button>
      </div>
    </div>
  )
}

export default orderSummary
