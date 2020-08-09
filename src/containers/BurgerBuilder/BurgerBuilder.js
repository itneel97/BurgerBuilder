import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummmary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://burgerbuilder-dedf7.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            }).catch(error => {
                this.setState({error: true})
            })
            
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        //alert('and, Here we Go!!!');
        // this.setState({ loading: true })
        // const order = {
        //     ingredient: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Neel',
        //         address: {
        //             street: 'main st',
        //             zipcode: '382721',
        //             country: 'India'
        //         },
        //         email: 'neel@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // // path appended to baseURL
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false })
        //     }).catch(error => {
        //         this.setState({ loading: false, purchasing: false })
        //     })
        const queryParams = [ ];
        for (let i in this.state.ingredients){
            queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) )
            // this is just generating queryString like bacon=0 cheese=1 meat=0 salad=1 
            // console.log( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&') // joined with & which makes it bacon=0&cheese=1&meat=0&salad=1
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString // and final outcome ?bacon=0&cheese=1&meat=0&salad=1 //which is exactly what we want
        })

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;        
        let burger = this.state.error ?<p>Ingredients can't be loaded!!!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
            </Aux>)

            orderSummary = <OrderSummmary
                purchaseCancelled={this.purchseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />

        }



        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchseCancelHandler} >
                    {orderSummary}

                </Modal>
                {burger}

            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);