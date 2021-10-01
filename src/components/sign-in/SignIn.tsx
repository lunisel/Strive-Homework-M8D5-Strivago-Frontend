import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import "./styles.css";

interface UserInterface {
  name: string;
  email: string;
  password: string;
  role?: string;
}

type CheckedInt = boolean

const SignIn = ({ history}: RouteComponentProps) => {
  const [user, setUser] = useState<UserInterface>({
    name: "",
    email: "",
    password: ""
  });

  const [checked, setChecked] = useState<CheckedInt>(false)

  const submit = async () => {
    try {
      let resp = await fetch(`${process.env.REACT_APP_BE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: checked ? JSON.stringify({
          ...user,
          role : "host"
        }) : JSON.stringify(user)
      })

      if(resp.ok){
        alert("REGISTERED!")
        history.push("/log-in")
      } else {
        console.log("Something went wrong !")
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id = e.target.id;

    setUser({
      ...user,
      [id]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="sign-in-big-cont">
      <div className="sign-in-content-cont">
        <h3 className="sign-in-title mb-3">Sign-in</h3>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="w-100 text-center"
        >
          <Row className="my-3 sign-in-row text-start">
            <Col xs={4}>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                placeholder="Enter your full name here..."
                className="sign-in-input"
                id="name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputs(e)
                }
              />
            </Col>
          </Row>
          <Row className="my-3 sign-in-row text-start">
            <Col xs={4}>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                placeholder="Enter your full name here..."
                className="name-input"
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputs(e)
                }
              />
            </Col>
          </Row>

          <Row className="my-3 sign-in-row text-start">
            <Col xs={4}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control
                type="password"
                placeholder="Enter your password here..."
                className="sign-in-input"
                id="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputs(e)
                }
              />
            </Col>
          </Row>

          <Row className="my-3 sign-in-row text-start">
            <Col xs={4}>
              <Form.Label>Are you a Host?</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Check
                className="sign-in-input"
                id="checked"
                onChange={() =>
                  setChecked(!checked)
                }
              />
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
