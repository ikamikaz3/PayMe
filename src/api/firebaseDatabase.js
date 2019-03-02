import * as firebase from "firebase";
import { AsyncStorage } from "react-native";

function updateWalletAmount(newPaymentKey) {
  AsyncStorage.getItem("uid", (error, result) => {
    if (!error) {
      firebase
        .database()
        .ref(`/user-payments/${result}/${newPaymentKey}`)
        .on("value", snapshot => {
          const newPayment = snapshot.val();
          console.log(newPayment);
          if (newPayment.type === "payment") {
            console.log("PAYMENT DONE");
          }
        });
    }
  });
}

function createPayment(newPayment, receiverUid) {
  AsyncStorage.getItem("uid", (error, result) => {
    if (!error) {
      const newPaymentKey = firebase
        .database()
        .ref()
        .child("payments")
        .push().key;

      const updates = {};
      updates[`/payments/${newPaymentKey}`] = newPayment;
      updates[`/user-payments/${result}/${newPaymentKey}`] = newPayment;
      updates[`/payments-users/${receiverUid}/${newPaymentKey}`] = newPayment;

      firebase
        .database()
        .ref(`/users/${result}`)
        .once("value")
        .then(userSnapshot => {
          const user = userSnapshot.val();
          updates[`/users/${result}`] = {
            walletAmount: user.walletAmount - newPayment.amount
          };
          firebase
            .database()
            .ref()
            .update(updates);
        });
    }
  });
}

function createUserEntry(uid, email) {
  firebase
    .database()
    .ref(`/users/${uid}`)
    .set({
      walletAmount: 0,
      email
    });
}

export { createPayment, createUserEntry, updateWalletAmount };
