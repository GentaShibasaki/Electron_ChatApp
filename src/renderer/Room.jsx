import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/database";
import "firebase/auth";

import Message from "./Message";
import NewMessage from "./NewMessage";

const ROOM_STYLE = {
  padding: "10px 30px"
};

export default function Room() {
  const [messages, setMessages] = useState([]);
  const [db, setDb] = useState(firebase.database());
  const [user, setUser] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    fetchRoom(roomId);
    setUser(firebase.auth().currentUser);
  }, [roomId]);

  useEffect(() => {
    fetchData(roomId);
  }, [messages]);

  function handleMessagePost(message) {
    const newItemRef = db
      .ref("/chatrooms/" + roomId)
      .child("messages")
      .push();
    newItemRef.update({
      writtenBy: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      time: Date.now(),
      text: message
    });
  }

  function fetchRoom(roomId) {
    db.ref("/chatrooms/" + roomId)
      .once("value")
      .then(snapshot => {
        const { description } = snapshot.val();
        window.document.title = description;
      });
  }

  function fetchData(roomId) {
    db.ref("/chatrooms/" + roomId + "/messages")
      .once("value")
      .then(snapshot => {
        const messagesTmp = [];
        snapshot.forEach(message => {
          messagesTmp.push(Object.assign({ key: message.key }, message.val()));
        });
        setMessages(messagesTmp);
      });
  }

  return (
    <div style={ROOM_STYLE}>
      <div className="list-group">
        {messages.map(m => (
          <Message key={m.key} message={m} />
        ))}
      </div>
      <NewMessage onMessagePost={handleMessagePost} />
    </div>
  );
}
