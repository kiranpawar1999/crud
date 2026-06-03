
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { insertUserData } from '../Redux/Slices/CurdSlice';



function CreatePage(props) {

  const [file, setFile] = useState(null);
  const [insertData, setInsertData] = useState({
    _id: "",
    student_name: "",
    student_age: "",
    student_email: "",
    student_phone: "",
    student_gender: "",
    student_photo: ""
  });

  console.log(insertData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('_id', insertData._id);
    formData.append('student_name', insertData.student_name);
    formData.append('student_age', insertData.student_age);
    formData.append('student_email', insertData.student_email);
    formData.append('student_phone', insertData.student_phone);
    formData.append('student_gender', insertData.student_gender);

    if (file) {
      formData.append('student_photo', file.name);
    }

    try {
      await dispatch(insertUserData(formData));

      alert("Data Inserted Successfully");
      navigate('/');
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };
  return (
    <div>

      <div className='d-flex w-100 mt-3 justify-content-center alighn-items-center'>

        <div className='w-75 border text-white p-3' style={{
          borderRadius: "20px", boxShadow: "0px 8px 15px 1px  black",
          backgroundColor: "#f7dc6f"
        }}>
          <h1 style={{ textAlign: "center", color: "rgba(211, 53, 37, 1)" }}>
            <u>Insert User Data </u> </h1>
          <br />

          <Form onSubmit={handleSubmit} encType="multipart/form-data">

            <Form.Group as={Col} md="4" controlId="formGridid">
              <Form.Label style={{ fontSize: "1.3rem", color: "bkack" }}>Student Id</Form.Label>
              <Form.Control

                type="number"
                name="_id"
                placeholder="Enter User id"

                onChange={(e) =>
                  setInsertData({ ...insertData, _id: e.target.value })}
                required /></Form.Group>


            <Form.Group as={Col} md="4" controlId="formGridName">
              <Form.Label style={{ fontSize: "1.3rem", color: "bkack" }}>Student Name</Form.Label>
              <Form.Control

                type="text"
                name="student_name"
                placeholder="Enter User name"

                onChange={(e) =>
                  setInsertData({ ...insertData, student_name: e.target.value })}
                required /></Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label style={{ fontSize: "1.3rem", color: "bkack" }} >Student_Email</Form.Label>

                <Form.Control
                  type="email"
                  name="student_email"
                  placeholder="Enteremail"
                  onChange={(e) =>
                    setInsertData({ ...insertData, student_email: e.target.value })

                  }
                  required />
              </Form.Group>
            </Row>


            <Row className="mb-3">
              <Form.Group as={Col} controlId="formPhoneNumber">
                <Form.Label style={{ fontSize: "1.3rem", color: "bkack" }} >Phone Number</Form.Label>
                <Form.Control type="tel"
                  name="student_phone"
                  onChange={(e) =>
                    setInsertData({ ...insertData, student_phone: e.target.value })
                  } />
              </Form.Group>
            </Row>



            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label style={{ fontSize: "1.3rem", color: "bkack" }} >Student Age</Form.Label>

                <Form.Control
                  type="number"
                  name="student_age"
                  placeholder="EnterUserAge"
                  onChange={(e) =>
                    setInsertData({ ...insertData, student_age: e.target.value })

                  }
                  required />
              </Form.Group>
            </Row>


            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label style={{ fontSize: "1.3rem", color: "bkack" }} >Student Gender</Form.Label>

                <Form.Select name='student_gender'
                  onChange={(e) => setInsertData({ ...insertData, student_gender: e.target.value })}>
                  <option >Select Gender</option>
                  <option >Female</option>
                  <option >Male</option>
                  <option >Other</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPhoto">
                <Form.Label style={{ fontSize: "1.3rem", color: "bkack" }} >Student Photo</Form.Label>

                <Form.Control
                  type="file"
                  name="student_photo"
                  placeholder="photo"
                  onChange={(e) => {
                    console.log("FILE SELECTED:", e.target.files[0]);
                    setFile(e.target.files[0])
                  }} />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">Submit</Button>
          </Form>


        </div>
      </div>
    </div>
  );
}

export default CreatePage;