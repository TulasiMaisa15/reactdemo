import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserDetails = () => {

    const defaultColDef = {
        sortable: false,
    }

    const columnDefs = [
        {
            headerName: "ID",
            field: "id",
            minWidth: 200,
            cellStyle: { 'textAlign': 'left' }
        },
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
        },
        {
            headerName: "Actions",
            minWidth: 200,
            cellStyle: { 'textAlign': 'left' },
            colId: "action",
            cellRenderer: (params) => {
                return (
                    <div>
                        <button title="edit"style={{ width: 50, height: 40}} onClick={() => UserUpdate(params.data)} data-toggle="modal" data-target="#view">Edit</button>

                        <button title="delete" style={{ width: 60, height: 40}} onClick={() => deleteUser(params.data.id)}>Delete</button>

                    </div>


                );
            }
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
    const [isValid, setIsValid] = useState(false);

    const [reset, setReset] = useState(false);
    const [user, setUser] = useState(false);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const UserUpdate = (info) => {
        setUser(info)
    }

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
            setEmailError(true);
            count4 = false;
        } else {
            setEmailError(false);
            count4 = true;
        }

        if (count1 === true && count2 === true && count3 === true && count4 === true) {
            setIsValid(true)
            let userObject = { firstName, lastName, phoneNumber, email }
            axios.post("http://localhost:8080/user/save", userObject)
                .then(
                    result => {
                        getAllUsers();
                        if (result.status === 201) {
                            setReset(false)
                            setFirstName("")
                            setLastName("")
                            setPhoneNumber("")
                            setEmail("")
                        }
                    }
                )
        } else {
            setIsValid(false)
            setReset(false)
        }
    }

    const formResetFunc = (event) => {
        if (count1 === true && count2 === true && count3 === true && count4 === true) {
            event.target.reset()
        }
    }
    const handleSubmit = async event => {
        event.preventDefault();
        await setReset(true)
        await validate();
        formResetFunc(event)

    }
    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        axios.get("http://localhost:8080/user/getall").then(response => {
            console.log(response);
            setrowData(response.data);
        })
    }

    const updateUser = () => {//mail validation
       let val=false;
        rowData.map(data=>{
            if(data.id!==user.id){
                if(user.email==data.email){
                    val= true;
                }else{
val= false;
                }
            }
        })
if(!val){
        axios.put(`http://localhost:8080/user/update`, user)
            .then(
                result => {
                    getAllUsers();
                    if (result.status === 201) {
                        setReset(false)
                        setFirstName("")
                        setLastName("")
                        setPhoneNumber("")
                        setEmail("")

                    }
                }
            )
    }else{
        alert("Your mail alreay exist")
    }
    }
    
    const deleteUser = (id) => {
        axios.delete(`http://localhost:8080/user/delete/${id}`)
            .then(
                result => {
                    getAllUsers();
                }
            )
    }
   

    const handleUser = (details, value) => {
        let info = Object.assign({}, user);
        info[details] = value;
        setUser(info);
    }

    return (

        <div  id="views" className="section">
            <h2>User Details</h2>
            <form onSubmit={handleSubmit}>

                <div className="inp">
                    <input type="text" style={{ width: 250, height: 30, paddingLeft: 80 }} id="fname" name="firstName" placeholder="First Name" value={firstName}
                        onChange={event => setFirstName(event.target.value)} autoComplete="off" ></input>
                    {<div className="valida" style={{ color: "#F61C04" }}>{fnameError &&
                        <p>Enter Your firstName </p>}</div>}
                </div>

                <div className="inp">
                    <input type="text" style={{ width: 250, height: 30, paddingLeft: 80 }} id="lname" name="lastName" placeholder="Last Name" value={lastName}
                        onChange={event => setLastName(event.target.value)} autoComplete="off"></input>
                    {<div className="valida" style={{ color: "#F61C04" }}>{lnameError && <p>Enter Your lastName</p>}</div>}
                </div>

                <div className="inp">
                    <input type="text" style={{ width: 250, height: 30, paddingLeft: 80 }} id="phone" name="phoneNumber" placeholder="PhoneNumber" value={phoneNumber}
                        onChange={event => setPhoneNumber(event.target.value)} autoComplete="off"></input>
                    {<div className="valida" style={{ color: "#F61C04" }}>{phoneError && <p>Enter valid Phone Number</p>}</div>}
                </div>

                <div className="inp">
                    <input type="text" style={{ width: 250, height: 30, paddingLeft: 100 }} id="email" name="email" placeholder="Email" value={email}
                        onChange={event => setEmail(event.target.value)} autoComplete="off"></input>
                    {<div className="valida" style={{ color: "#F61C04" }}>{emailError && <p>Enter Your email</p>}</div>}
                </div>

                <div >

                    <Button className="sub" type="submit" disabled={reset}>Submit</Button>
                </div>
            </form>
            <div className="ag-theme-alpine" style={{ width: 1200, height: 400 }}>

                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </div>
            
    
            <div className="modal" id="view" role="dialog" aria-labelledby="viewModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document"> 
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3  id="viewModalLabel">Edit Details</h3>
                        </div>
                        <div className="modal-body">


                            <input type="text" className="form-control" placeholder="FirstName" value={user.firstName}
                                onChange={(event) => handleUser("firstName", event.target.value)}></input>

                            <input type="text" className="form-control" placeholder="LastName" value={user.lastName}
                                onChange={(event) => handleUser("lastName", event.target.value)}></input>

                            <input type="text" className="form-control" placeholder="PhoneNumber" value={user.phoneNumber}
                                onChange={(event) => handleUser("phoneNumber", event.target.value)}></input>

                            <input type="text" className="form-control"  placeholder="Email" value={user.email}
                                onChange={(event) => handleUser("email", event.target.value)}></input>

                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => updateUser(getAllUsers.info)} data-target="#views">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    


    );
};
export default UserDetails;