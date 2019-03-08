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
      walletAmount: payerSnapshot.val().walletAmount - newPayment.amount
    };
    updates[`/users/${receiverUid}`] = {
      email: receiverSnapshot.val().email,
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

export { createPayment, createUserEntry, getUser };
