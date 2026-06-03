

import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { readData } from '../Redux/Slices/CurdSlice.jsx';
import { NavLink, useNavigate } from "react-router";



function HomePage() {
    const [radioData, setRadioData] = useState("ALL");

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    const userData = useSelector(state => state.allCurd.data);
    const searchUserData = useSelector(state => state.allCurd.searchData);

    // console.log(searchUserData);


    // console.log(userData);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (token) {
            dispatch(readData());
        }
    }, [dispatch]);




    return (
        <>
            {userData.length === 0 ? <center><h2>Data not found </h2>
                <button className="btn btn-primary" onClick={() => navigate('/create-page')}>Data insert</button> </center> :

                <div>

                    <Container>

                        <h2 style={{ textAlign: "center", color: "black" }}><u>All Data Show</u> </h2><br />
                        {/* Gender Start */}
                        <div style={{ boxShadow: "2px -2px 8px 1px black", margin: "10px 37%", padding: "12px", fontSize: "1.1rem", fontWeight: "bold", borderRadius: "8px" }}>
                            <div className="form-check form-check-inline">

                                <input className="form-check-input" type="radio" name="gender" id="all" value="All"
                                    checked={radioData === " "} onChange={(e) => { setRadioData(" ") }} />

                                <label className="form-check-label" htmlFor="all">All</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="Male"
                                    checked={radioData === "Male"} onChange={(e) => { setRadioData(e.target.value) }}
                                />
                                <label className="form-check-label" htmlFor='male'>Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="Female"
                                    checked={radioData === "Female"} onChange={(e) => { setRadioData(e.target.value) }} />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>

                        </div>
                        {/* gender end */}
                        <div>
                            <NavLink to='/create-page'>
                                <button className='btn btn-primary my-2'>
                                    InserData </button></NavLink>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <td>Student Id</td>
                                    <td>student Image</td>
                                    <td>Student Name</td>
                                    <td>Student age</td>
                                    <td>Student Email</td>
                                    <td>Student phone</td>
                                    <td>Student gender</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.filter((values) => {
                                        if (searchUserData.length == 0) {
                                            return values;
                                        }
                                        else {
                                            return values.student_name.toLowerCase().includes(searchUserData.toLowerCase());
                                        }
                                    }).filter((value) => {

                                        if (radioData === 'Male') {
                                            return value.student_gender === radioData;
                                        }
                                        else if (radioData === 'Female') {
                                            return value.student_gender === radioData;
                                        } else {
                                            return value;
                                        }
                                    }).map((value, index) => {
                                        {/* console.log(value); */}

                                        return (
                                            <tr key={index}>
                                                <td>{value._id}</td>
                                                <td><img src={value.student_photo} alt="" width={120} /></td>
                                                <td>{value.student_name}</td>
                                                <td>{value.student_age}</td>
                                                <td>{value.student_email}</td>
                                                <td>{value.student_phone}</td>
                                                <td>{value.student_gender}</td>

                                                <td>
                                                    <NavLink to={`/update-page/${value._id}`}>
                                                        <button className='btn btn-success'>Update</button>

                                                    </NavLink>

                                                    <NavLink to={`/delete-page/${value._id}`}>
                                                        <button className='btn btn-danger mx-2'>Delete</button>
                                                    </NavLink>

                                                    <NavLink to={`/read-page/${value._id}`}>
                                                        <button className='btn btn-warning'>Read</button>
                                                    </NavLink>


                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </Table>
                    </Container>

                </div>}
        </>
    );
}
export default HomePage;