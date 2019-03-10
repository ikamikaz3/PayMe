/* global XMLHttpRequest:false */
import * as firebase from "firebase";

function getUser(uid) {
  return firebase
    .database()
    .ref(`/users/${uid}`)
    .once("value")
    .then(snapshot => snapshot);
}

function createPayment(newPayment, receiverSnapshot, receiverUid) {
  const payerUid = firebase.auth().currentUser.uid;
  const newPaymentKey = firebase
    .database()
    .ref()
    .child("payments")
    .push().key;

  return getUser(payerUid).then(payerSnapshot => {
    const updates = {};
    updates[`/payments/${newPaymentKey}`] = newPayment;
    updates[`/user-payments/${payerUid}/${newPaymentKey}`] = newPayment;
    updates[`/payments-users/${receiverUid}/${newPaymentKey}`] = newPayment;

    updates[`/users/${payerUid}`] = {
      email: payerSnapshot.val().email,
      firstname: payerSnapshot.val().firstname,
      lastname: payerSnapshot.val().lastname,
      walletAmount: payerSnapshot.val().walletAmount - newPayment.amount
    };
    updates[`/users/${receiverUid}`] = {
      email: receiverSnapshot.val().email,
      firstname: receiverSnapshot.val().firstname,
      lastname: receiverSnapshot.val().lastname,
      walletAmount: receiverSnapshot.val().walletAmount + newPayment.amount
    };
    return firebase
      .database()
      .ref()
      .update(updates, error => error);
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

const UploadImage = async (uri, imageFileName) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
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

  await ref.put(blob);
  return ref.getDownloadURL();
};

export { createPayment, createUserEntry, getUser, UploadImage };
