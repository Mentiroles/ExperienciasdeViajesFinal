import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormText } from 'react-bootstrap';
import { loginUser } from "../../services/backend";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';


export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await loginUser({ email, password });
      navigate("/profile");

      if (loginUser === true) {
        setAuth(true);
      }

    } catch (error) {
      setError("Incorrect email or password"); 
    }
  };

  return (
    <>
      <Form className="w-75 mx-auto mt-5" onSubmit={handleForm}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" id='email' name='email' value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id='password' name='password' value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Remember me." />
        </Form.Group>
        <Button variant="primary" className='w-100' type="submit">
          Login
        </Button>
        {error && <FormText className="text-danger">{error}</FormText>}
        <FormText className="text-center">
  Don't have an account? <Link to="/register"><Button variant="link">Register</Button></Link>
</FormText>
      </Form>
    </>
  );
}

export default LoginForm;