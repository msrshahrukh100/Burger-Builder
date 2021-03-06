import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios_orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICES = {
	meat: 1.3,
	salad: 0.3,
	tomato: 1.7,
	cheese: 0.6
}

class BurgerBuilder extends React.Component {

	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => ingredients[igKey])
			.reduce((sum, count) => {
				return sum + count
			}, 0)
		this.setState({
			purchasable: sum > 0
		})
	}

	addIngredientHandler = (type) => {
		const initialCount = this.state.ingredients[type]
		const finalCount = initialCount + 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = finalCount
		const initialPrice = this.state.totalPrice
		const finalPrice = initialPrice + INGREDIENTS_PRICES[type]

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: finalPrice
		})

		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		const initialCount = this.state.ingredients[type]
		if (initialCount <=0 ) {
			return
		}
		const finalCount = initialCount - 1
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = finalCount
		const initialPrice = this.state.totalPrice
		const finalPrice = initialPrice - INGREDIENTS_PRICES[type]

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: finalPrice
		})

		this.updatePurchaseState(updatedIngredients)
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelledHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinuedHandler = () => {
		// alert("Pay now man")
		this.setState({loading: true})
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Mohammad Shahrukh",
				address: {
					street: 'Bangalore India',
					country: 'India'
				},
				email: 'shahrukh@gmial.com'
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			.then(response => {
				console.log(response)
				this.setState({loading: false, purchasing: false})
			})
			.catch(error => {
				console.log(error)
				this.setState({loading: false, purchasing: false})
			})
	}

	componentDidMount() {
		axios.get('/ingredients.json')
			.then(response => {
				console.log(response)
				this.setState({
					ingredients: response.data
				})
			})
			.catch(error => {
				this.setState({error: true})
			})
	}

  render () {

  	let disabledInfo = {...this.state.ingredients}
  	for(let igKey in disabledInfo) {
  		disabledInfo[igKey] = disabledInfo[igKey] <= 0
  	}

		let burger = this.state.error ? <p>Cannot fetch data</p> : <Spinner />
		let orderSummary = null
		if(this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						purchasable={this.state.purchasable}
						totalPrice={this.state.totalPrice}
						ingredientAdded={this.addIngredientHandler}
						ingredientsRemoved={this.removeIngredientHandler}
						disabledInfo={disabledInfo}
						ordered={this.purchaseHandler}
						/>
				</Aux>
		)
		orderSummary = <OrderSummary
			price={this.state.totalPrice}
			ingredients={this.state.ingredients}
			cancelled={this.purchaseCancelledHandler}
			continued={this.purchaseContinuedHandler}/>
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

    return (
      <Aux>
      	<Modal
					show={this.state.purchasing}
					purchaseCancelled={this.purchaseCancelledHandler}>
      		{orderSummary}
      	</Modal>
				{burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
