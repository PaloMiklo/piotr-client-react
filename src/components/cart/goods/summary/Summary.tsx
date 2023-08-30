import { faBasketShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActionTypes } from "../../../../store/constant/action";
import { useAppDispatch } from "../../../../store/hook/hook";
import { action } from "../../../../store/util";
import Counter from "./counter/Counter";
import './Summary.scss';

const Summary = (): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const clear = (): void => { dispatch(action(ActionTypes.CART_RESET)) };

    return (
        <div className="shopping-cart-summary mq-mr-min-md mq-mr-min-sm-max-md mq-pr-max-sm mq-pr-max-smart">
            <ul className="shopping-cart-summary-wrapper">

                <Counter></Counter>

                <li className="shopping-cart-summary-wrapper-list-buttons mx-auto">
                    <button className="btn" onClick={clear}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="btn" onClick={() => navigate('checkout')}>
                        <FontAwesomeIcon icon={faBasketShopping} />
                    </button>
                </li>

                <div className="continue">
                    <Link to="/">continue shopping</Link>
                </div>
            </ul>
        </div >
    );
}

export default Summary;
