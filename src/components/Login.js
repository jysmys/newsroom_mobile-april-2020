import { useState } from "react";
import * as React from "react";
import { connect, useSelector } from "react-redux";
import { authenticate } from "../modules/auth";
import { View, Text } from "react-native";
import LoginForm from "./LoginForm";
import styles from "./module/Login.component.style.js";
// import dispatchers from "../modules/dispatchers";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = useSelector((state) => state.errorMessage);
  const showLoginForm = useSelector((state) => state.showLoginForm);

  const onLoginhandler = async () => {
    const response = await authenticate(email, password);
    props.dispatch({
      type: "CHECK_LOGIN",
      payload: {
        authenticated: true,
        role: response.data.role,
        uid: response.data.uid,
      },
    });
    props.dispatch({
      type: "SHOW_LOGIN",
      payload: { showLoginForm: false },
    });
  };

  const showLogin = () => {
    props.dispatch({
      type: "SHOW_LOGIN",
      payload: { showLoginForm: !showLoginForm },
    });
  };
  const message = !!errorMessage && props.visibleForm && (
    <Text style={styles.errorText} testID={"error-message"}>
      {errorMessage}
    </Text>
  );

  return (
    <View style={styles.background}>
      {props.visibleForm && (
        <LoginForm
          setPassword={setPassword}
          setEmail={setEmail}
          onLoginhandler={onLoginhandler}
          showLogin={showLogin}
          email={email}
          password={password}
        />
      )}
      {message}
    </View>
  );
};

export default connect()(Login);
