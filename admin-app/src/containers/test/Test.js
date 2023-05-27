import React, { useState } from "react";
import Input from "../../components/Ui/input/Input";

export default function Test() {

    const [state,setState] =  useState('halumsasa')

    const userLogin = (e) => {
        e.preventDefault()
    }

  return (
    <form onSubmit={userLogin}>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} label={state}/>
        <button onClick={() => setState('sasaaas')}>change text</button>
    </form>
  );
}
