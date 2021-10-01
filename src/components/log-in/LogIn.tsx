import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import "./styles.css";

interface LogInInterface {
  email: string;
  password: string;
}

const LogIn = ({ history }: RouteComponentProps) => {
  const [logIn, setLogIn] = useState<LogInInterface>({
    email: "",
    password: "",
  });

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id = e.target.id;

    setLogIn({
      ...logIn,
      [id]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      let resp = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logIn),
      });

      if (resp.ok) {
        let data = await resp.json();
        console.log(data);
        window.localStorage.setItem("key", data.accessToken);
        history.push("/");
      } else {
        console.log("Something went wrong !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-big-cont">
      <div className="login-content-cont">
        <h3>Log-in</h3>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="w-100 text-center d-flex flex-column"
        >
          <Row className="my-3 log-in-row text-start">
            <Col xs={4}>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                placeholder="Enter your email here..."
                className="name-input"
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputs(e)
                }
              />
            </Col>
          </Row>

          <Row className="my-3 log-in-row text-start">
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

          <Button type="submit" className="my-2">
            Submit
          </Button>
          <Link to="/sign-in" className="mt-3">
            You don't have an account? Sign-in !
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
