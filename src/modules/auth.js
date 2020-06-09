import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const authenticate = async (email, password) => {
  // const storageRoleKey = "auth-roles";

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/auth/sign_in", {
        email: email,
        password: password,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await storeSession(response.headers);
      resolve(response);
    } catch (error) {
      // dispatch(
      // { type: "SHOW_LOGIN", payload: { showLoginForm: setShowLogin } })
      reject(error);
    }
  });
};

const storeSession = async (headers) => {
  const session = {
    uid: headers["uid"],
    client: headers["client"],
    access_token: headers["access-token"],
    expiry: headers["expiry"],
    token_type: "Bearer",
  };
  await AsyncStorage.setItem("auth-storage", JSON.stringify(session));
};

// const validateToken = (headers) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await axios.get("api/validate_token", {
//         params: {
//           uid: headers.uid,
//           client: headers.client,
//           "access-token": headers["access-token"],
//         },
//       });
//       storeSession(response.headers);
//       resolve(response.data);
//     } catch (err) {
//       this.debugIfActive(err.response);
//       reject(err);
//     }
//   });
// };

export { authenticate };
