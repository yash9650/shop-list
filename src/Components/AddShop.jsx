import { useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch} from 'react-redux';
import { add } from "../store/shopSlice";

const AddShop = () => {
    const navigate = useNavigate(); 

    // can combine these state using useReducer
    const [shopName,setShopName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [closeDate, setCloseDate] = useState(null);
    const [dateError, setDateError] = useState(false);


    const areaRef = useRef();
    const categoryRef = useRef();
    const openDateRef = useRef();

    const dispatch = useDispatch();

    const nameChangeHandler = (e) => {
      // dispatch(add(shopName));
        if(!e.target.value){
            setNameError(false);
            return;
        }
        // add \s in Regex to allow space
        if(/^[a-zA-Z]+$/.test(e.target.value)){
            setNameError(false);
            setShopName(e.target.value);
        }else{
            setNameError(true);
        }
    }

    const openDateChangeHandler = (e) => {
        if(!closeDate){
            return;
        }
        if(e.target.value > closeDate){
            setDateError(true);
        }else{
            setDateError(false);
        }
    }

    const closeDateChangeHandler = (e) =>{
        if(openDateRef.current.value<=e.target.value){
            setDateError(false);
            setCloseDate(e.target.value);
        }else{
            setDateError(true);
        }
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        if(nameError || dateError){
            alert("Please fill the correct details");
        }else{
            alert("Succefully added shop");
            const newShop = {
              id: uuidv4(),
              shopName,
              area: areaRef.current.value,
              category: categoryRef.current.value,
              openDate: openDateRef.current.value,
              closeDate
            }
            console.log(newShop);
            // props.addToList(newShop);
            dispatch(add(newShop));
            navigate('/');
        }
    }


    return (
        <Form style={{width: "40%", margin: '5% auto'}} onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Shop name</Form.Label>
        {nameError && <p style={{color: 'red', margin: '-10px 0px 0px 0px', padding: '0px',fontSize: '12px'}}>Please enter alphabets only</p>}
        <Form.Control type="text" placeholder="Enter shop name" onChange={nameChangeHandler} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Area</Form.Label>
        <Form.Select ref={areaRef} required>
            <option value="Thane">Thane</option>
            <option value="Pune">Pune</option>
            <option value="MumbaiSuburban">Mumbai Suburban</option>
            <option value="Nashik">Nashik</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Ahmednagar">Ahmednagar</option>
            <option value="Solapur">Solapur</option>
          </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select ref={categoryRef} required>
            <option value="Grocery">Grocery</option>
            <option value="Butcher">Butcher</option>
            <option value="Baker">Baker</option>
            <option value="Chemist">Chemist</option>
            <option value="StationeryShop">Stationery shop</option>
          </Form.Select>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridOpenDate">
          <Form.Label>Open date</Form.Label>
          <Form.Control type="date" ref={openDateRef} onChange={openDateChangeHandler} required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCloseDate">
          <Form.Label>Close date</Form.Label>
        {dateError && <p style={{color: 'red', margin: '-10px 0px 0px 0px', padding: '0px',fontSize: '12px'}}>Please enter valid date</p>}
          <Form.Control type="date" onChange={closeDateChangeHandler} required/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    );
}

export default AddShop;