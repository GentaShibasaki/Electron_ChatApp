import React, { useState, useEffect } from "react";
import {
  Route,
  useRouteMatch,
  useHistory,
  useLocation
} from "react-router-dom";
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/database";
import "firebase/auth";
import Room from "./Room";
import RoomItem from "./RoomItem";

const ICON_CHAT_STYLE = {
  fontSize: 120,
  color: "#DDD"
};

const FORM_STYLE = {
  display: "flex"
};

const BUTTON_STYLE = {
  marginLeft: 10
};

const LOGOUT_BUTTON_STYLE = {
  marginLeft: 10,
  marginTop: 10
};

export default function Rooms() {
  let { path } = useRouteMatch();
  let history = useHistory();
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const db = firebase.database();
  let location = useLocation();
  let roomId = location.pathname.split("/")[2];

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [rooms]);

  function handleOnChangeRoomName(e) {
    setRoomName(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (!roomName.length) {
      return;
    }

    const newRoomKey = db.ref("/chatrooms").push();
    const newRoom = {
      description: roomName
    };
    newRoomKey.update(newRoom).then(() => {
      setRoomName("");
      fetchRooms().then(() => {
        history.replace(`/rooms/${newRoomKey.key}`);
      });
    });
  }

  function fetchRooms() {
    return db
      .ref("/chatrooms")
      .limitToLast(20)
      .once("value")
      .then(snapshot => {
        const rooms = [];
        snapshot.forEach(item => {
          rooms.push(Object.assign({ key: item.key }, item.val()));
        });
        setRooms(rooms);
      });
  }

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.replace("/login");
      })
      .catch(error => {
        setError(error);
      });
  }

  function renderRoomList() {
    return (
      <div className="list-group">
        <button onClick={() => logout()} style={LOGOUT_BUTTON_STYLE}>
          logout
        </button>
        <div className="list-group-header">
          <form style={FORM_STYLE} onSubmit={handleOnSubmit}>
            <input
              type="tet"
              className="form-control"
              placeholder="New room"
              onChange={handleOnChangeRoomName}
              value={roomName}
            />
            <button
              className="btn btn-default"
              style={BUTTON_STYLE}
              type="submit"
            >
              <span className="icon icon-plus" />
            </button>
          </form>
        </div>
        {rooms.map(room => (
          <RoomItem room={room} key={room.key} selected={room.key === roomId} />
        ))}
      </div>
    );
  }

  function renderRoom() {
    if (roomId) {
      return <Route path={`${path}/:roomId`} component={Room} />;
    } else {
      return (
        <div className="text-center">
          <div style={ICON_CHAT_STYLE}>
            <span className="icon icon-chat" />
          </div>
          <p>Join a chat room from the sidebar or create your chat room.</p>
          <p>{error}</p>
        </div>
      );
    }
  }

  return (
    <div className="pane-group">
      <div className="pane-sm sidebar">{renderRoomList()}</div>
      <div className="pane">{renderRoom()}</div>
    </div>
  );
}
