import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  TextInput,
  Button,
  Column,
  Grid,
  Row,
  Link as InlineLink,
} from "carbon-components-react";
import firebase from "firebase";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({
    code: "",
    message: "",
  });

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
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
        setIsSubmitting(false);
      });
  };

  return (
    <Grid>
      <Row>
        <Column></Column>
        <Column>
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
                invalid={[
                  "auth/wrong-password",
                  "auth/user-not-found",
                ].includes(error.code)}
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
                invalid={[
                  "auth/wrong-password",
                  "auth/user-not-found",
                ].includes(error.code)}
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
        </Column>
        <Column></Column>
      </Row>
    </Grid>
  );
};

export default SignupPage;
