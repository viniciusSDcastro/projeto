import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [nome, setNome] = useState(todo.nome);
  const [duracao, setDuracao] = useState(todo.duracao);
  console.log('Tá entrando aqui!!!!')

  //edit description function

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { nome, duracao };
      // const baseURL =  process.env.NODE_ENV === "production"
      //   ? "/todos"
      //   : "http://localhost:5000/todos";
      const response = await fetch(
        `/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${todo.id}`}
        onClick={() => setNome(nome)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Filme</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setNome(todo.nome)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                value={duracao}
                onChange={e => setDuracao(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setNome(todo.nome)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
