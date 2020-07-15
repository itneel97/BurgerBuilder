import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    /* // Object is a js object - keys method extracts the keys of a given object and turns into an array
     const temp1 = Object.keys(props.ingredients) //
     const temp2 = Object.keys(props.ingredients).map(igKey => igKey) // making it like array like each ingredient is different array
     const temp3 = Object.keys(props.ingredients).map(igKey => { return [...Array(props.ingredients[igKey])] }); //creating array of total number of ingredients in this case it is six
     const temp4 = Object.keys(props.ingredients)
         .map(igKey => {
             return [...Array(props.ingredients[igKey])].map((_, i) =>  ((igKey+i) +": "+ igKey) )  ;
             });
     const temp5 = Object.keys([...Array(props.ingredients["meat"])]) // this returns how many elements are there with same key like there are two meat in the ingredients
     */

    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return (<BurgerIngredient key={igKey + i} type={igKey} />);
            });
        });

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            {/* {"keys:" + temp1}<br />
            {"mapigkeys:" + temp2} <br />
            {"temp3:" + temp3}<br />
            {"final:" + temp4}<br />
            {"temp5: " + temp5 + ":"} */}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;