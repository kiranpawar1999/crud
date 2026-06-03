import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteUserData } from '../Redux/Slices/CurdSlice';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function DeletePage() {
    const { id } = useParams();

    const [deleteData, setDeleteData] = useState({
        _id: "",
        student_name: "",
        student_age: "",
        student_email: "",
        student_phone: "",
        student_gender: ""
    });

    const readData = useSelector((state) => state.allCurd.data);

    useEffect(() => {
        if (id && readData.length > 0) {
            let data = readData.filter((value) => value._id === Number(id));
            setDeleteData(data[0] || {});
        }
    }, [id, readData]);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let deleteUser = new FormData();
        deleteUser.append('_id', deleteData._id);
        deleteUser.append('student_name', deleteData.student_name);
        deleteUser.append('student_age', deleteData.student_age);
        deleteUser.append('student_email', deleteData.student_email);
        deleteUser.append('student_phone', deleteData.student_phone);
        deleteUser.append('student_gender', deleteData.student_gender);

        console.log("Deleting ID:", deleteData._id);

        dispatch(deleteUserData(deleteData._id));

        alert('User Deleted Successfully...');
        navigate('/');
    };
    return (
        <div className='d-flex w-100 mt-3 justify-content-center align-items-center'>
            <div className='w-75 border p-3'
                style={{
                    borderRadius: "20px",
                    boxShadow: "0px 8px 15px 1px black",
                    backgroundColor: "#f7dc6f"
                }}>

                <h1 style={{ textAlign: "center", color: "#d33525" }}>
                    <u>User Delete Form</u>
                </h1>

                <Form onSubmit={handleSubmit}>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Student Id</Form.Label>
                            <Form.Control
                                type="number"
                                value={deleteData._id}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={deleteData.student_name}
                                readOnly
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Student Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={deleteData.student_age}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Student Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={deleteData.student_email}
                                readOnly
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Student Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                value={deleteData.student_phone}
                               readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Student Gender</Form.Label>
                            <Form.Control
                                type="text" readOnly
                                value={deleteData.student_gender}
                            />
                        
                        </Form.Group>
                    </Row>


                    <Button variant="primary" type="submit">
                        Delete
                    </Button>
                </Form>
            </div>
        </div>

    );
}

export default DeletePage;