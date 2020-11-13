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
  Checkbox,
  FormGroup,
  RadioButton,
  RadioButtonGroup,
} from "carbon-components-react";
import firebase from "firebase";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userType, setUserType] = useState("");
  const [error, setError] = useState({
    code: "",
    message: "",
  });

  const submit = () => {
    setIsSubmitting(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user && user)
          firebase.firestore().collection("/users").doc(user.uid).set({
            type: "Receptionist",
          });
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
      })
      .finally((...args) => console.log("finally", args));
  };
  return (
    <Grid>
      <Row>
        <Column></Column>
        <Column>
          <Form>
            <FormGroup legendText="Automobilist or Receptionist?">
              <RadioButtonGroup
                orientation="horizontal"
                labelPosition="left"
                defaultSelected=""
                name="radio-button-group"
                onChange={(selected: string) => setUserType(selected)}
                valueSelected={userType}>
                <RadioButton
                  value="automobilist"
                  id="radio-1"
                  labelText="automobilist"
                />
                <RadioButton
                  value="receptionist"
                  id="radio-2"
                  labelText="receptionist"
                />
              </RadioButtonGroup>
            </FormGroup>
            <div style={{ marginBottom: "2rem" }}>
              <TextInput
                // helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
                id="email"
                labelText="Email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                invalid={error.code === "auth/invalid-email"}
                invalidText={
                  error.code === "auth/invalid-email" ? error.message : ""
                }
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
                invalid={error.code === "auth/weak-password"}
                invalidText={
                  error.code === "auth/weak-password" ? error.message : ""
                }
              />
            </div>
            <div>
              Already have an account?{" "}
              <Link
                to="/login"
                component={({ navigate, ...props }) => {
                  return (
                    <InlineLink inline {...props}>
                      Login
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
              disabled={userType === ""}>
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
