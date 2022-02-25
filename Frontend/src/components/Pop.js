import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "./login/Login";
import "./Pop.css";

export default function Pop() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Login />
      </Modal>
    </>
  );
}
