import React from 'react';
import classes from './Order.module.css'

const order = () => (
    <div className={classes.Order}>
        <p>Ingredients: </p>
        <p>Price: <strong>CAD</strong> </p>
    </div>
)

export default order;