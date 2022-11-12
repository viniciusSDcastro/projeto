import React, { Fragment, useState } from "react";

const InputAtor = () => {
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { nome, nascimento };
        //     const baseURL =  process.env.NODE_ENV === "production"
        // ? "/ator"
        // : "http://localhost:5000/ator";
            const response = await fetch(`/ator`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            console.log(response)
            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">Lista de Atores</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
            type="date"
            className="form-control ml-2"
            placeholder="data"
            value={nascimento}
            onChange={e => setNascimento(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
        </Fragment>
    )
}

export default InputAtor;
