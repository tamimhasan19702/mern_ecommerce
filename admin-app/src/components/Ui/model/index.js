/**
 * * title: Modal component
 * * description: this is the Separate Modal component that is used in the both product and category component
 * * author: Tareq Monower
 * *
 *
 * @format
 */


import React from "react";
import { Modal,Button } from "react-bootstrap";

function NewModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose} >
    <Modal.Header closeButton>
      <Modal.Title>{props.ModalTitle}</Modal.Title>
    </Modal.Header>
       
       <Modal.Body>
        {props.children}
       </Modal.Body>
  
    <Modal.Footer>
      {/* handleClose function finally submits everything in the backend and closes the modal popup */}
      <Button variant="primary" onClick={props.handleClose} type="submit">
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default NewModal;
