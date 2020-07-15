import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return (<BurgerIngredient key={igKey + i} type={igKey} />);
            });
        })// reduce accepts function as a input and here it has two arguments previousValue(arr) and currentValue(el) 
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []); // [] is initial value
    /** 
     * we can use flatMap as well
        var arr = [1, 2, 3, 4];
        arr.flatMap(x => [x, x * 2]);
        // is equivalent to
        arr.reduce((acc, x) => acc.concat([x, x * 2]), []);
        // O/P: [1, 2, 2, 4, 3, 6, 4, 8]
    */

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding Ingredients!</p>
    }

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}          
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;