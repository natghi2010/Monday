import { Col, Row, Container, Card } from "react-bootstrap";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

function LoginOrRegister(props) {

  const [formMode, setFormMode] = useState("login");

  return (
    <Container className="ml">
      <Row style={{ width: "30rem",marginLeft:"43em" }}>
        <Col md={12} lg={12} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
             
             <Logo/>
                <h2 className="fw-bold mb-2 text-uppercase text-center ">
                  Monday
                </h2>

                {formMode == 'login' ? <p className="mb-5 text-center">Please enter your email and password to login</p> : 
                <p className="mb-5 text-center">Please enter your info to sign up</p>}


                <div className="mb-3">
                    {formMode == 'login' ? <LoginForm/> : <SignUpForm/>}
                     
                  <div className="mt-3">
                 
                   {formMode == 'login' && <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <a href="{''}" onClick={(e)=>{e.preventDefault();setFormMode('signUp')}} className="text-primary fw-bold">
                        Sign Up
                      </a>
                    </p>}

                    {formMode == 'signUp' && <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <a href="{''}" onClick={(e)=>{e.preventDefault();setFormMode('login')}} className="text-primary fw-bold">
                        Login
                      </a>
                    </p>}

                  </div>

                  
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginOrRegister;
