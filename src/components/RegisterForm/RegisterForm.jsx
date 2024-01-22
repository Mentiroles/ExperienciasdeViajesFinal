import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormText } from 'react-bootstrap';
import { registerNewUser } from "../../services/backend";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';



export const RegisterForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await registerNewUser({ email, password, nickName });
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <Form className="w-75 mx-auto mt-5" onSubmit={handleForm}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" id='nickName' name='nickName' value={nickName} required onChange={(e) => setNickName(e.target.value)} placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" id='email' name='email' value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
                
        <Form.Group className="mb-3" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id='password' name='password' value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
        </Form.Group>
        <Button variant="primary" className='w-100' type="submit" >
          Register
        </Button>
      </Form>
      {error ? <p>{error}</p> : null}
      <FormText className="text-center">
  Already have an account? <Link to="/login"><Button variant="link">Register</Button></Link>
</FormText>
    </>
  );
};

export default RegisterForm;