import React from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode";
import * as firebase from "firebase";

const Collect = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Collect Screen</Text>
    <QRCode
      value={firebase.auth().currentUser.uid}
      size={400}
      bgColor="purple"
      fgColor="white"
    />
  </View>
);

export default Collect;
