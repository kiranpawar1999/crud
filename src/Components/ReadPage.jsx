import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ReadPage() {

  const { id } = useParams();

  const userData = useSelector((state) => state.allCurd.data);

  // find single user by _id (convert id to number)
  const singleUser = userData.find(
    (value) => value._id === Number(id)
  );

  // If user not found
  if (!singleUser) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        User Not Found
      </h2>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#d33525" }}>
        <u>Read Page</u>
      </h1>

      <div className='d-flex w-100 mt-4 justify-content-center align-items-center'>
        <Card
          style={{
            width: '28rem',
            boxShadow: "0px 8px 15px 1px black"
          }}
        >
          <Card.Body
            className='text-center'
            style={{
              backgroundColor: "#f7dc6f",
              color: "red"
            }}
          >

            <Card.Title>{`User ID : ${singleUser._id}`}</Card.Title>
            <Card.Title>{`User Name : ${singleUser.student_name}`}</Card.Title>
            <Card.Title>{`User Age : ${singleUser.student_age}`}</Card.Title>
            <Card.Title>{`User Gender : ${singleUser.student_gender}`}</Card.Title>
            <Card.Title>{`User Email : ${singleUser.student_email}`}</Card.Title>
            <Card.Title>{`User Phone : ${singleUser.student_phone}`}</Card.Title>

            <div className="mt-3">

              <Link to='/'>
                <Button variant='primary'>
                  Go Back Home
                </Button>
              </Link>

              <Link to={`/update-page/${singleUser._id}`}>
                <Button variant='warning' className='mx-3'>
                  Edit Data
                </Button>
              </Link>

            </div>

          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ReadPage;
