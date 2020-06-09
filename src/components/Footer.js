import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useSelector, connect } from "react-redux";
import Login from "./Login";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import fonts from "./module/fonts";
import auth from "../modules/auth";
import styles from "./module/Footer.component.style.js";
import * as RootNavigation from "../state/reducers/rootNavigation.js";

const Footer = ({ dispatch }) => {
  let [fontsLoaded] = useFonts(fonts);
  const authenticated = useSelector((state) => state.authenticated);
  const showLoginForm = useSelector((state) => state.showLoginForm);
  const uid = useSelector((state) => state.uid);
  // const [modalVisible, setModalVisible] = useState(false);

  const showButton = authenticated ? (
    <>
      {/* <Text>Welcome, {uid}</Text> */}
      <TouchableOpacity
        testID={"Logoutbutton"}
        onPress={async () => {
          try {
            await auth.signOut();
            dispatch({
              type: "CHECK_LOGIN",
              payload: { authenticated: false, role: "" },
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Text style={styles.sub}>Logout</Text>
      </TouchableOpacity>
    </>
  ) : (
    <TouchableOpacity
      testID={"Loginbutton"}
      onPress={() => {
        dispatch({
          type: "SHOW_LOGIN",
          payload: { showLoginForm: true },
        });
      }}
    >
      <Text style={styles.sub}>Login</Text>
    </TouchableOpacity>
  );

  const modalShow = !showLoginForm && (
    <>
      <Text style={styles.header}>DNS </Text>
      {showButton}
    </>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={[
          styles.background,
          showLoginForm ? { backgroundColor: "rgba(0, 0, 0, 0.3)" } : "",
        ]}
      >
        <Modal
          style={styles.formModal}
          presentationStyle="overFullScreen"
          animationType={"slide"}
          backdropOpacity={1}
          transparent={true}
          isVisible={showLoginForm}
          onRequestClose={() => {
            Alert.alert("Modal has been Opened.");
          }}
        >
          <Login visibleForm={showLoginForm} dispatch={dispatch} />
          <TouchableOpacity
            style={styles.background}
            onPress={() => RootNavigation.navigate("ArticleList")}
          >
            {modalShow}
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
};

export default connect()(Footer);
