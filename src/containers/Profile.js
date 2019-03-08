import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Image, Text, View, Button, Alert } from "react-native";
import { Logout } from "../redux/actions/actionCreators";
//import { RNCamera, FaceDetector } from 'react-native-camera';
import{ ImagePicker } from 'expo';
import { Permissions } from 'expo';
import * as firebase from 'firebase';

onChooseImagePress =  async () => {

  //const response = await Permissions.askAsync(Permissions.CAMERA);
  const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

  let result = await ImagePicker.launchCameraAsync();

  if (permission.status === 'granted'){
   if(!result.cancelled) {
     uploadImage(result.uri, "photo_profile")
     .then(() => {
       Alert.alert("Votre photo a bien été prise");
     })

     .catch((error) => {
       Alert.alert(error);
     });
   }
  }
}
  uploadImage = async (uri, imageFileName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase.storage.ref().child("photo_profile/" + imageFileName);
    return ref.put(blob);
  }

const Profile = props => {
  const { logoutAction } = props;
  

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Appuyer ici pour vous prendre en photos"
      onPress={onChooseImagePress}>
      </Button>
      <Button title="Logout" onPress={() => logoutAction()} />
    </View>
  );
};

Profile.propTypes = {
  logoutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(Logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Profile);
