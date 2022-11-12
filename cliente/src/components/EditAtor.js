import React, { Fragment, useState } from "react";

const EditAtor = ({ ator }) => {
  const [nome, setNome] = useState(ator.nome);
  const [nascimento, setNascimento] = useState(ator.nascimento);

  //edit description function
    console.log(`nome: ${nome} -> nascimento: ${nascimento}`)
    //console.log(ator.nascimento)
  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { nome, nascimento };
      console.log(`O nome aqui é ${nome}`)
      // const baseURL =  process.env.NODE_ENV === "production"
      //   ? "/ator"
      //   : "http://localhost:5000/ator";
      const response = await fetch(
        `$/ator`,
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

  // const setar = function(e){
  //   e.preventDefault()
  //   setNome(ator.nome)
  //   setNascimento(ator.nascimento)
  // }
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id_ator${ator.id}`}
      >
        Editar
      </button>

      <div
        class="modal"
        id={`id_ator${ator.id}`}
        onClick={() => setNome(nome)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Editar Ator</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setNome(ator.nome)}
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
                type="date"
                className="form-control"
                value={nascimento}
                onChange={e => setNascimento(e.target.value)}
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
                onClick={() => setNome(ator.nome)}
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

export default EditAtor;
