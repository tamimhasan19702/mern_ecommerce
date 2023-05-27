/** @format */

import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {

  let input = null;

  switch(props.type){
    case 'select':
    input = <Form.Group>
            {props.label && <Form.Label>{props.label}</Form.Label>}
            <select
            className="form-control form-control-sm"
            value={props.value}
            onChange={props.onChange}>

              <option value="">{props.placeholder}</option>
            
              {
                props.options.length > 0 ?
                props.options.map((option,index) => {
                  <option key={index} value={option.value}>{option.name}</option>
                }) : null
              }

            </select>       
            </Form.Group>
            break;
            case 'text':
            default:
              input = <Form.Group>
                       {ptops.label && <Form.Label>{props.label}</Form.Label>}
                      </Form.Group>
  }

  
}


export default Input