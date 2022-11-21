import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import store from "../store/store";
import Card from "./Card";

const ShopList = () => {
    const initialState = {
        area: "",
        category: "",
        openStatus: ""
    }

    const reducerfx = (state, action) => {
        switch (action.type) {
            case "area":
                return { area: action.area, category: state.category, openStatus: state.openStatus };
            case "category":
                return { area: state.area, category: action.category, openStatus: state.openStatus };
            case "openStatus":
                return { area: state.area, category: state.category, openStatus: action.openStatus };
            default:
                return { area: state.area, category: state.category, openStatus: state.openStatus };
        }
    }

    const originalShopList = useSelector(store => store.shopList.list);
    const [state, dispatchfx] = useReducer(reducerfx, initialState);
    const [list, setList] = useState(originalShopList);

    useEffect(() => {
        setList(originalShopList);
    }, [originalShopList]);

    const showAll = () => {
        setList(originalShopList);
    }

    const categoryChangeHandler = (e) => {
        dispatchfx({ type: "category", category: e.target.value });
    }

    const areaChangeHandler = (e) => {
        dispatchfx({ type: "area", area: e.target.value });
    }

    const statusChangeHandler = (e) => {
        dispatchfx({ type: "openStatus", openStatus: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!state.area && !state.category && !state.openStatus) {
            showAll();
            return;
        }

        const newList = originalShopList.filter(e => {
            if (state.area && e.area !== state.area) {
                return false;
            }
            if (state.category && e.category !== state.category) {
                return false;
            }
            if (state.openStatus) {
                let today = new Date();
                let dd = String(today.getDate());
                let mm = String(today.getMonth() + 1);
                let yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                if (state.openStatus === "yes" && (today < e.openDate || today > e.closeDate)) {
                    return false;
                }
                if (state.openStatus === "no" && today >= e.openDate && today <= e.closeDate) {
                    return false;
                }
            }
            return true;
        });
        setList(newList);
    }

    return (
        <div style={{ margin: "5% auto", width: "52%" }}>
            <h1 style={{display: 'inline' ,padding: '10px'}}>Shop List</h1>
            <button style={{margin: '10px', fontSize: "0.8em"}} onClick={showAll}>show all</button>
            <Form className="d-flex" onSubmit={submitHandler}>
                <Row>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Select onChange={areaChangeHandler}>
                            <option value="">Area</option>
                            <option value="Thane">Thane</option>
                            <option value="Pune">Pune</option>
                            <option value="MumbaiSuburban">Mumbai Suburban</option>
                            <option value="Nashik">Nashik</option>
                            <option value="Nagpur">Nagpur</option>
                            <option value="Ahmednagar">Ahmednagar</option>
                            <option value="Solapur">Solapur</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Select onChange={categoryChangeHandler}>
                            <option value="">Category</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Butcher">Butcher</option>
                            <option value="Baker">Baker</option>
                            <option value="Chemist">Chemist</option>
                            <option value="StationeryShop">Stationery shop</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Select onChange={statusChangeHandler}>
                            <option value="">status</option>
                            <option value="yes">open</option>
                            <option value="no">close</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Button type="submit" variant="light"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg></Button>
                    </Form.Group>
                </Row>
            </Form>

            {
                list.map((e, i) => <Card index={i+1} key={e.id} shop={e} />)
            }
            {list.length === 0 && <p>No shops available</p>}
        </div>
    );
}

export default ShopList;