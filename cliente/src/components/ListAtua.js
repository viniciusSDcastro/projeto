import React, { Fragment, useEffect, useState } from "react";
import EditAtua from "./EditAtua";

//import EditAtor from "./EditAtor";

const ListAtua = () => {
  console.log('AAA')
    const [listaAtua, setListaAtua] = useState([]);

    const deleteAtua = async id => {
      try {
        const baseURL =  process.env.NODE_ENV === "production"
        ? "/atua"
        : "http://localhost:5000/atua";
        console.log(`O ID de dentro é ${id}`)
        console.log(listaAtua)
        const deleteTodo = await fetch(`${baseURL}/${id}`, {
          method: "DELETE"
        });
        
        //setListaAtua(listaAtua.filter(atua => atua.id !== id));
        getTodos()
      } catch (err) {
        console.error(err.message);
      }
    };

    const getTodos = async () => {
        try {
          const baseURL =  process.env.NODE_ENV === "production"
        ? "/atua"
        : "http://localhost:5000/atua";
          const response = await fetch(`${baseURL}`);
          const jsonData = await response.json();
          console.log(`dados de atuação: ${jsonData}`);
          setListaAtua(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      };
      useEffect(() => {
        getTodos();
      }, []);
      console.log(listaAtua)
      return (
        <Fragment>
          {" "}
          <table class="table mt-5 text-center">
            <thead>
              <tr>
                <th>filme</th>
                <th>Ator</th>
                <th>personagem</th>
                <th> Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {/*<tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr> */}
              {listaAtua.map(atua => (
                <tr key={`atua${atua.id_elenco}`}>
                  <td>{atua.filme}</td>
                  <td>{atua.ator}</td>
                  <td>{atua.personagem}</td>
                  <td>
                  <EditAtua atua={atua}/>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAtua(atua.id_elenco)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
}

export default ListAtua;