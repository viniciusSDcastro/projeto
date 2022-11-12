import React, { Fragment, useEffect, useState } from "react";

import EditAtor from "./EditAtor";

const ListAtores = () => {
  console.log('AAA')
    const [atores, setAtores] = useState([]);

    const deleteAtor = async id => {
      try {
        // const baseURL =  process.env.NODE_ENV === "production"
        // ? "/ator"
        // : "http://localhost:5000/ator";
        const deleteTodo = await fetch(`/ator/${id}`, {
          method: "DELETE"
        });
  
        setAtores(atores.filter(todo => todo.id !== id));
      } catch (err) {
        console.error(err.message);
      }
    };

    const getTodos = async () => {
        try {
        //   const baseURL =  process.env.NODE_ENV === "production"
        // ? "/ator"
        // : "http://localhost:5000/ator";
          const response = await fetch(`/ator`);
          const jsonData = await response.json();
    
          setAtores(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      };
      useEffect(() => {
        getTodos();
      }, []);
      console.log(atores)
      return (
        <Fragment>
          {" "}
          <table class="table mt-5 text-center">
            <thead>
              <tr>
                <th>id</th>
                <th>ator/atriz</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/*<tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr> */}
              {atores.map(ator => (
                
                <tr key={ator.id}>
                  <td>{ator.id}</td>
                  <td>{ator.nome}</td>
                  <td>
                  <EditAtor ator={ator} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAtor(ator.id)}
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

export default ListAtores;
