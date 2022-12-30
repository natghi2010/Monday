import { useState, useContext } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Formik, Field, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import Loading from "../../../common/Loading";
import { AppContext } from "../../../../App";
import axios from "axios";
//import { get, post } from "../../lib/api";

const LoginForm = () => {
  //get app context
  const { user, setUser } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    axios
      .post("/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem("user", JSON.stringify(res.data.data));
          
         
          setIsSubmitting(false);
          setUser(res.data.data);
          window.location.href = "/";
      
        } 
      })
      .catch((err) => {
        setErrors(err.response.data.message);
        setIsSubmitting(false);
      });
  };

  return (
    <Form>
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

      <span className="text-danger">{errors}</span>


      <div className="d-grid">
        {!isSubmitting && (
          <Button variant="primary" onClick={() => handleSubmit()}>
            Login
          </Button>
        )}
        <div align="center">
          {isSubmitting && <Loading text="Logging in..." />}
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
