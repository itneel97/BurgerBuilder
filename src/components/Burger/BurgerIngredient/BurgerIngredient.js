import React, { Component } from 'React';
import classes from 'BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {

    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredint = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredint = (
                    <div className={classes.breadTop}>
                        <div className={classes.seeds1}></div>
                        <div className={classes.seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>
                break;
            default:
                ingredient: null;
        }
        return ingredient
    };
}
// classname. property = {javascriptobject}
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;