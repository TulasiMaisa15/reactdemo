import React, { useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const Userinfo = () => {
    const defaultColDef = {
        sortable: false,
    }

    const columnDefs = [
       
        {
            headerName: "First Name",
            field: "firstName",
            minWidth: 200,
            cellStyle: { 'textAlign': 'left' }
        },
        {
            headerName: "Last Name",
            field: "lastName",
            minWidth: 150,
            cellStyle: { 'textAlign': 'left' }
        },
        {
            headerName: "Phone Number",
            field: "phoneNumber",
            minWidth: 200,
            cellStyle: { 'textAlign': 'left' }
        },
        {
            headerName: "Email",
            field: "email",
            minWidth: 200,
            cellStyle: { 'textAlign': 'left' }
        }
    
    ]


    const [firstName, setFirstName] = useState('');
     const [fnameError, setFnameError] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lnameError, setLnameError] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
  
    const [rowData, setrowData] = useState([]);
    const [reset, setReset] = useState(false);

    const Firstname = new RegExp('^[A-Za-z]+$');
    const Lastname = new RegExp('^[A-Za-z]+$');
    const Phonenumber = new RegExp('^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$');
    const Email = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

    let count1 = false;  //to check error when its submit
    let count2 = false;
    let count3 = false;
    let count4 = false;

    const validate = () => {
        if (!Firstname.test(firstName)) {
            setFnameError(true);
            count1 = false;
        } else {
            setFnameError(false);
            count1 = true;
        }

        if (!Lastname.test(lastName)) {
            setLnameError(true);
            count2 = false;
        } else {
            setLnameError(false);
            count2 = true;
        }
        if (!Phonenumber.test(phoneNumber)) {
            setPhoneError(true);
            count3 = false;
        } else {
            setPhoneError(false);
            count3 = true;
        }
        if (!Email.test(email)) {
            setEmailError (true);
            count4 = false;
        } else {
            setEmailError(false);
            count4 = true;
        }

        if (count1 === true && count2 === true && count3 === true && count4 === true) {
   
            let userObject = { firstName, lastName, phoneNumber, email }
      
    }

    return (

        <div>
            <h2>User Details</h2>
            <form >
                <div className="input">

                First Name:
                <input type="text" style={{ width: 250, height: 30, marginRight: 358 }} id="fname" name="firstName" placeholder="First Name" value={firstName}
                    onChange={event => setFirstName(event.target.value)} autoComplete="off" ></input>
                {/* {<div className="valida" style={{ color: "#F61C04" }}>{fnameError &&
                        <p>Enter Your firstName </p>}</div>} */}


                Last Name:
                <input type="text" style={{ width: 250, height: 30, paddingRight: 140 }} className="inp" id="lname" name="lastName" placeholder="Last Name" value={lastName}
                    onChange={event => setLastName(event.target.value)} autoComplete="off"></input><br></br><br></br>
                {/* {<div className="valida" style={{ color: "#F61C04" }}>{lnameError && <p>Enter Your lastName</p>}</div>} */}


                Phone Number:
                <input type="text" style={{ width: 250, height: 30,marginRight: 705}} id="phone" name="phoneNumber" placeholder="Phone Number" value={phoneNumber}
                    onChange={event => setPhoneNumber(event.target.value)} autoComplete="off"></input><br></br><br></br>
                {/* {<div className="valida" style={{ color: "#F61C04" }}>{phoneError && <p>Enter valid Phone Number</p>}</div>} */}

                Email:
                <input type="text" style={{ width: 250, height: 30,marginRight: 650 }} id="email" name="email" placeholder="Email" value={email}
                    onChange={event => setEmail(event.target.value)} autoComplete="off"></input>
                {/* {<div className="valida" style={{ color: "#F61C04" }}>{emailError && <p>Enter Your email</p>}</div>} */}
                </div>

                <div >

                    <Button className="sub" type="submit">Submit</Button>
                </div>

            </form>
            <div className="ag-theme-alpine" style={{ width: 1200, height: 400 }}>

<AgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    defaultColDef={defaultColDef}
/>
</div>

        </div>


                        );
                    }
};
export default Userinfo;