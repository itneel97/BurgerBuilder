import React, { Component } from 'react';
import CheckoutSummar from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

    state = {
        ingredients: {
            salad:1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for( let param of query.entries()) {
            // [ 'salad, '1']
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

    chckoutCancelledHandler = ()  =>{
        this.props.history.goBack();
    }

    chekcoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render() {
        return(
            <div>
                <CheckoutSummar 
                ingredients={this.state.ingredients}
                chckoutCancelled={this.chckoutCancelledHandler}
                checkoutContinued={this.chekcoutContinuedHandler} />
            </div>
        )
    }

}

export default Checkout;