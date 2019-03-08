/* global XMLHttpRequest:false */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Button, Alert } from "react-native";
import { ImagePicker, Permissions } from "expo";
import * as firebase from "firebase";

import {
  GoToHistory,
  GoToPayment,
  Logout
} from "../redux/actions/actionCreators";
import GestureNavigator from "../components/GestureNavigator";

const uploadImage = async (uri, imageFileName) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = e => {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const { uid } = firebase.auth().currentUser;

  const ref = firebase
    .storage()
    .ref()
    .child(`photo_profile/${uid}/${imageFileName}`);
  return ref.put(blob);
};

const onChooseImagePress = async () => {
  const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
  const cameraRollPermission = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );

  const result = await ImagePicker.launchCameraAsync();

  if (
    cameraPermission.status === "granted" &&
    cameraRollPermission.status === "granted"
  ) {
    if (!result.cancelled) {
      uploadImage(result.uri, "profile_pic.png")
        .then(() => {
          Alert.alert(
            "Success",
            "Image uploaded !",
            [
              {
                text: "Ask me later",
                onPress: () => console.log("Ask me later pressed")
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

const Profile = props => {
  const { logoutAction, goToPaymentAction, goToHistoryAction } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <GestureNavigator
        actionForLeft={() => goToPaymentAction()}
        actionForRight={() => goToHistoryAction()}
      >
        <Text>Profile Screen</Text>
        <Button
          title="Appuyer ici pour vous prendre en photos"
          onPress={onChooseImagePress}
        />
        <Button title="Logout" onPress={() => logoutAction()} />
      </GestureNavigator>
    </View>
  );
};

Profile.propTypes = {
  goToPaymentAction: PropTypes.func.isRequired,
  goToHistoryAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  goToPaymentAction: () => dispatch(GoToPayment()),
  goToHistoryAction: () => dispatch(GoToHistory()),
  logoutAction: () => dispatch(Logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Profile);
