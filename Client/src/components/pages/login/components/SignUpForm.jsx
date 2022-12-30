import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Formik, Field, useFormik, FormikProvider } from "formik";
import Loading from "../../../common/Loading";
import axios from "axios";
// import * as Yup from "yup";
// import { get, post } from "../../lib/api";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user,setUser] = useState(null);

  const handleSubmit = () => {
    axios.post("/auth/login",{
      firstName,
      lastName,
      email,
      password
    }).then(res => {
      window.localStorage.setItem("user", JSON.stringify(res.data.data));
      setUser(res.data.data);
    }).catch((err) => {
      console.log(err);
      setIsSubmitting(false);
    })
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label className="text-center">First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label className="text-center">Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-center">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3 mt-3" controlId="formBasicShowPassword">
        <Form.Check
          type="checkbox"
          label="Show password"
          className="mt-2"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <p className="small">
          <a className="text-primary" href="#!">
            Forgot password?
          </a>
        </p>
      </Form.Group>

      <div className="d-grid">
        {isSubmitting && <Loading text="Submitting"/>}
        {!isSubmitting && <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Sign Up
        </Button>}
      </div>
    </Form>
  );
};

export default SignUpForm;