import React, { Fragment, useState } from "react";

const EditAtua = ({ atua }) => {
  const [filme, setFilme] = useState(atua.id_f);
  const [ator, setAtor] = useState(atua.id_a);
  const [personagem, setPersonagem] = useState(atua.personagem);
  

  //edit description function
    //console.log(`nome: ${nome} -> nascimento: ${nascimento}`)
    //console.log(ator.nascimento)
  const updateAtua = async e => {
    e.preventDefault();
    try {
      const body = { filme, ator, personagem };
      const baseURL =  process.env.NODE_ENV === "production"
        ? "/atua"
        : "http://localhost:5000/atua";
      //console.log(`O nome aqui é ${nome}`)
      console.log(filme, ator, personagem)
      const response = await fetch(
        `${baseURL}/${atua.id_elenco}`,
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
        data-target={`#id_atuacao${atua.id_elenco}`}
      >
        Editar
      </button>

      <div
        class="modal"
        id={`id_atuacao${atua.id_elenco}`}
        onClick={() => setFilme(filme)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Editar Elenco</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setFilme(atua.filme)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={filme}
                onChange={e => setFilme(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                value={ator}
                onChange={e => setAtor(e.target.value)}
              />
               <input
                type="text"
                className="form-control"
                value={personagem}
                onChange={e => setPersonagem(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateAtua(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setFilme(atua.filme)}
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

export default EditAtua;