import { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Formik, Field, useFormik, FormikProvider } from "formik";
import Loading from "../../../common/Loading";
import axios from "axios";
import * as Yup from "yup";
// import { get, post } from "../../lib/api";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState("");


  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik =  useFormik({
   initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      setErrors("");
  
      axios
        .post("/auth/register",values)
        .then((res) => {
          window.localStorage.setItem("user", JSON.stringify(res.data.data));
          setUser(res.data.data);
          setIsSubmitting(false);
          window.location.href = "/";
        })
        .catch((err) => {
          setErrors(err.response.data.message);
          setIsSubmitting(false);
        });
    },
  });

  return (
    <Form>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label className="text-center">First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange} 
        />
        {formik.touched.firstName && formik.errors.firstName && (
            <span className='text-danger'>{formik.errors.firstName}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label className="text-center">Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange} 
        />
        {formik.touched.lastName && formik.errors.lastName && (
            <span className='text-danger'>{formik.errors.lastName}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label className="text-center">Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Email"
          value={formik.values.email}
          onChange={formik.handleChange} 
        />
        {formik.touched.email && formik.errors.email && (
            <span className='text-danger'>{formik.errors.email}</span>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label className="text-center">Password</Form.Label>
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange} 
        />
        {formik.touched.password && formik.errors.password && (
            <span className='text-danger'>{formik.errors.password}</span>
        )}
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

      <span className="text-danger text-center">{errors}</span>

      <div className="d-grid">
        {isSubmitting && <Loading text="Submitting" />}
        {!isSubmitting && (
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            Sign Up
          </Button>
        )}
      </div>
    </Form>
  );
};

export default SignUpForm;
