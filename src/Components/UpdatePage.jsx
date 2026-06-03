import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserData, readData } from '../Redux/Slices/CurdSlice';

function UpdatePage() {

    const { id } = useParams();

    const [file, setFile] = useState(null);
    const [updateData, setUpdateData] = useState({
        _id: "",
        student_name: "",
        student_age: "",
        student_email: "",
        student_phone: "",
        student_gender: ""
    });
    // console.log(updateData);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const readUserData = useSelector((state) => state.allCurd.data);

    // console.log(readUserData);

    useEffect(() => {
        if (id) {
            let data = readUserData.filter((value) => value._id == id);
            // console.log(data);

            setUpdateData(data[0]);
        }

    }, [id, readUserData])


    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = new FormData();
        userData.append('student_photo', file);
        userData.append('_id', updateData._id);
        userData.append('student_name', updateData.student_name);
        userData.append('student_age', updateData.student_age);
        userData.append('student_email', updateData.student_email);
        userData.append('student_phone', updateData.student_phone);
        userData.append('student_gender', updateData.student_gender);

        dispatch(updateUserData(userData));
        console.log(updateData);

        alert('User Updated Successfully!');
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
                    <u>User Update Form</u>
                </h1>

                <Form onSubmit={handleSubmit}>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Student Id</Form.Label>
                            <Form.Control
                                type="number"
                                value={updateData._id}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={updateData.student_name}
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, student_name: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Student Age</Form.Label>
                            <Form.Control
                                type="number"
                                value={updateData.student_age}
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, student_age: e.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Student Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={updateData.student_email}
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, student_email: e.target.value })
                                }
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Student Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                value={updateData.student_phone}
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, student_phone: e.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Student Gender</Form.Label>
                            <Form.Select
                                value={updateData.student_gender}
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, student_gender: e.target.value })
                                }
                                required
                            >
                                <option value="">Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAddress">
                            <Form.Label>Student_Photo</Form.Label>
                            <Form.Control type="file" name='photo' placeholder="Enter photo"
                                onChange={(e) => setFile(e.target.files[0])} />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>

                </Form>
            </div>
        </div>
    );
}

export default UpdatePage;
