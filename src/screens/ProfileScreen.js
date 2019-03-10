import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Alert,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { Permissions, ImagePicker } from "expo";

import {
  GoToHistory,
  GoToHome,
  SetProfilePictureURI
} from "../redux/actions/actionCreators";
import AppText from "../components/AppText";
import { UploadImage } from "../api/firebaseDatabase";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(0, 191, 255, 0.5)",
    height: 150
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
    bottom: 30
  },
  avatarLogo: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
    bottom: 40
  },
  digiTitre: {
    alignSelf: "center",
    fontSize: 40.7,
    top: 15
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 3,
    alignItems: "center",
    padding: 30
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "rgba(0, 191, 255, 0.5)"
  },
  profileFont: {
    fontSize: 20
  }
});

const onChooseImagePress = async setProfilePictureURI => {
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
      UploadImage(result.uri, "profile_pic.png")
        .then(uri => {
          setProfilePictureURI(uri);
          Alert.alert(
            "Success",
            "Image uploaded !",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ],
            { cancelable: false }
          );
        })
        .catch(() => {
          Alert.alert(
            "Error",
            "Image uploaded failed!",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK" }
            ],
            { cancelable: false }
          );
        });
    }
  }
};

class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  constructor(props) {
    super(props);

    const { goToHomeAction, goToHistoryAction } = this.props;
    const position = new Animated.ValueXY();

    this.gestureDelay = -35;
    this.state = { position };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -35) {
          const newX = gestureState.dx - this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        } else if (gestureState.dx > 35) {
          const newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -175) {
          Animated.timing(position, {
            toValue: { x: -300, y: 0 },
            duration: 150
          }).start(() => {
            goToHomeAction();
          });
        } else if (gestureState.dx > 175) {
          Animated.timing(position, {
            toValue: { x: 300, y: 0 },
            duration: 300
          }).start(() => {
            goToHistoryAction();
          });
        } else {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 300
          }).start();
        }
      }
    });
  }

  render() {
    const { position } = this.state;
    const { uri, setProfilePictureURIAction } = this.props;
    return (
      <Animated.View
        style={[position.getLayout(), styles.container]}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.header}>
          <AppText style={styles.digiTitre}>My Digi Pay </AppText>
        </View>
        <TouchableHighlight
          onPress={() =>
            onChooseImagePress(url => setProfilePictureURIAction(url))
          }
        >
          <Image style={styles.avatar} source={{ uri }} />
        </TouchableHighlight>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TouchableOpacity style={styles.buttonContainer}>
              <AppText style={styles.profileFont}>Prenom</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <AppText style={styles.profileFont}>Nom</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <AppText style={styles.profileFont}>Mail</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <AppText style={styles.profileFont}>Tel</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }
}

ProfileScreen.propTypes = {
  uri: PropTypes.string.isRequired,
  goToHistoryAction: PropTypes.func.isRequired,
  goToHomeAction: PropTypes.func.isRequired,
  setProfilePictureURIAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  uri: state.authReducer.uri
});

const mapDispatchToProps = dispatch => ({
  goToHistoryAction: () => dispatch(GoToHistory()),
  goToHomeAction: () => dispatch(GoToHome()),
  setProfilePictureURIAction: uri => dispatch(SetProfilePictureURI(uri))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
