import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  TextInput,
  Button,
  Link as InlineLink,
} from "carbon-components-react";
import firebase from "firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({
    code: "",
    message: "",
  });
  const history = useHistory();

  const submit = () => {
    setIsSubmitting(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((...args) => {
        setError({
          code: "",
          message: "",
        });
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <Form>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput
              // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
              id="email"
              labelText="Email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={["auth/wrong-password", "auth/user-not-found"].includes(
                error.code
              )}
              invalidText="Wrong credentials"
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <TextInput.PasswordInput
              // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
              id="password"
              labelText="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              invalid={["auth/wrong-password", "auth/user-not-found"].includes(
                error.code
              )}
              invalidText="Wrong credentials"
            />
          </div>
          <div>
            Not registered yet?{" "}
            <Link
              to="/signup"
              component={({ navigate, ...props }) => {
                return (
                  <InlineLink inline {...props}>
                    Sign up
                  </InlineLink>
                );
              }}>
              {" "}
              bonita
            </Link>
          </div>
          <Button
            kind="primary"
            tabIndex={0}
            onClick={submit}
            disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="login-right"></div>
    </div>
  );
};

export default LoginPage;
