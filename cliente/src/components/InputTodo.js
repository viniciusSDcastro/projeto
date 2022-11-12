import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const baseURL =  process.env.NODE_ENV === "production"
        ? "/todos"
        : "http://localhost:5000/todos";
      const body = { nome, duracao };
      const response = await fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response)
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Lista de Filmes</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="nome do filme"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
            type="number"
            className="form-control ml-2"
            placeholder="duracao em minutos"
            value={duracao}
            onChange={e => setDuracao(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;