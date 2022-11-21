import React from 'react';
import { useDispatch } from 'react-redux';
import { del } from '../store/shopSlice';
import { Button } from 'react-bootstrap';
import classes from './css/Card.module.css';

const Card = (props) => {
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(del(props.shop.id));
    }

    return (
        <div className={classes.card}>
            <p style={{ display: "inline-flex" }} className={classes.index}>{props.index}.</p>
            <b> <p style={{ display: "inline" }} className={classes.title}>{props.shop.shopName}</p> </b>
            <div className={classes.subcard}>
                <p style={{ display: "inline" }} className={classes.title}>Area: {props.shop.area}</p>
                <p style={{ display: "inline" }} className={classes.title}>Category: {props.shop.category}</p>
            </div>
            <button onClick={clickHandler} className={classes.button}><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"/><path fill="none" d="M0 0h48v48H0z"/></svg></button>
        </div>
    );
}

export default Card;