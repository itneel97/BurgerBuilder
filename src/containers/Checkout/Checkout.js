import React, { Component } from 'react';
import CheckoutSummar from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux';

class Checkout extends Component {

    chckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    chekcoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummar
                    ingredients={this.props.ings}
                    chckoutCancelled={this.chckoutCancelledHandler}
                    checkoutContinued={this.chekcoutContinuedHandler} />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);