import React from "react";
import { Form } from "react-bootstrap";

export default function Input(props) {
  return (
        <Form.Group className="mb-3" controlId={`formBasic${props.label}`}>
                <Form.Label>{props.label}</Form.Label>
                <Form.Control type={props.type} placeholder={props.placeholder} />
                <Form.Text className="text-muted">
                    {props.errorMessage}
                </Form.Text>
        </Form.Group>
  );
}
