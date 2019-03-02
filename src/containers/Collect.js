import React from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode";

const Collect = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Collect Screen</Text>
    <QRCode
      value={{ text: "Bonjour !" }}
      size={200}
      bgColor="purple"
      fgColor="white"
    />
  </View>
);

export default Collect;
