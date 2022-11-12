import React, { Fragment } from "react";
import "./App.css";
import InputAtor from "./components/inputAtor";
import InputAtua from "./components/inputAtua";

//components

import InputTodo from "./components/InputTodo";
import ListAtores from "./components/ListAtores";
import ListAtua from "./components/ListAtua";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
        <InputAtor />
        <ListAtores />
        <InputAtua />
        <ListAtua />
      </div>
    </Fragment>
  );
}

export default App;