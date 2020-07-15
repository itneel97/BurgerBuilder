import React from 'rect';
import classes from './BuildControl.module.css';
const buildControl = (props) => (
    <div className={classes.buildControl} >
        <div className={classes.Label} >{PaymentResponse.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
);

export default buildControl;