import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data) // res.data holds data we get from firebase
                const fetchOrders = []
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchOrders })
            }).catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {

        return (
            <div>
               {this.state.orders.map(order => (
                   <Order 
                   key={order.id}
                   ingredients={order.ingredients}
                   price={order.price} />
               ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios) ;