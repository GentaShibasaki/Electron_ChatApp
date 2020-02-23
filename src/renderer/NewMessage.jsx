import React, { useState } from "react";

const FORM_STYLE = {
  display: "flex"
};
const BUTTON_STYLE = {
  marginLeft: 10
};

export default function NewMessage(props) {
  const { onMessagePost } = props;
  const [message, setMessage] = useState("");

  function handleOnChange(e) {
    setMessage(e.target.value);
  }

  function handleOnSubmit(e) {
    if (!onMessagePost || message.length === 0) {
      return;
    }
    onMessagePost(message);
    setMessage("");
  }

  return (
    <form style={FORM_STYLE} onSubmit={handleOnSubmit}>
      <input
        type="text"
        className="form-control"
        onChange={handleOnChange}
        value={message}
      />
      <button
        className="btn btn-large btn-primary"
        style={BUTTON_STYLE}
        type="submit"
      >
        POST
      </button>
    </form>
  );
}
