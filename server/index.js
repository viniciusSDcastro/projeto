require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db");
const path = require("path");
const { reset } = require("nodemon");

console.log(__dirname);

/*
servidor nodemon index

cliente 
cd cliente
npm start
*/
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "cliente/build")));
  }

app.post("/ator",async(req,res) => {
    try {
        const {nome, nascimento} = req.body
    const novoAtor = await pool.query('INSERT INTO ator (nome, nascimento) VALUES ($1, $2) RETURNING *',[nome,nascimento]);
    res.json(novoAtor.rows[0]);
    } catch (error) {
        console.log(`1)${error.message}`)
    }
    
})

app.get("/ator",async(req,res) =>{
    try {
        const allTodos = await pool.query("SELECT * FROM ator ORDER BY id ASC");
        res.json(allTodos.rows)
    } catch (err) {
        console.log(err.message)
        
    }
})

app.post("/todos", async(req,res) => {
    try {
        const{nome,duracao} = req.body
        const newTodo = await pool.query('INSERT INTO filme (nome, duracao) VALUES ($1, $2) RETURNING *',[nome, duracao] );

        res.json(newTodo.rows[0])
    } catch (err) {
        console.log(`1)${err.message}`)
    }
})

app.get("/todos",async(req,res) =>{
    try {
        const allTodos = await pool.query("SELECT * FROM filme ORDER BY id ASC");
        res.json(allTodos.rows)
    } catch (err) {
        console.log(err.message)
        
    }
})

app.put("/todos/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const {nome,duracao} = req.body
        const updateTodo = await pool.query("UPDATE filme SET nome = $1 where id = $2",[nome,id]);
        const updateTodo2 = await pool.query("UPDATE filme SET duracao = $1 where id = $2",[duracao,id]);
        res.json("Todo foi atualizado!")
    } catch (err) {
        console.log(`atualizar: ${err.message}`)
        
    }
})

app.put("/ator/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const {nome,nascimento} = req.body
        console.log(id,nome,nascimento)
        const updateAtor = await pool.query("UPDATE ator SET nome = $1 where id = $2",[nome,id]);
        const updateAtor2 = await pool.query("UPDATE ator SET nascimento = $1 where id = $2",[nascimento,id]);
        res.json("Todo foi atualizado!")
    } catch (error) {
        console.log(`atualizar: ${error.message}`)
    }
    
})

app.put("/atua/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const {filme,ator, personagem} = req.body
        console.log(`filme = ${filme}/ ator = ${ator} / personagem = ${personagem}`)
        //console.log(id,nome,nascimento)
        const updateAtua = await pool.query("UPDATE elenco SET filme = $1 where id_elenco = $2",[filme,id]);
        const updateAtor2 = await pool.query("UPDATE elenco SET ator = $1 where id_elenco = $2",[ator,id]);
        const updateAtor3 = await pool.query("UPDATE elenco SET personagem = $1 where id_elenco = $2",[personagem,id]);
        res.json("Todo foi atualizado!")
    } catch (error) {
        console.log(`atualizar: ${error.message}`)
    }
    
})

app.delete("/todos/:id",async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM filme WHERE id = $1",[id]);
        res.json("filme foi deletado!!")
    } catch (err) {
        console.log(err.message)
        
    }
})

app.delete("/ator:id",async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM ator WHERE id = $1",[id]);
        res.json("ator foi deletado!!")
    } catch (err) {
        console.log(err.message)
        
    }
})

app.delete("/atua/:id", async(req,res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const deletaAtua = await pool.query("DELETE FROM elenco WHERE id_elenco = $1",[id])
        res.json("foi deletado do elenco");
    } catch (error) {
        console.log(error)
    }
    
})

app.get("/atua",async(req,res) => {
    try {
        const allAtua = await pool.query(`SELECT filme.id as id_f, filme.nome as filme, ator.nome as ator, ator.id as id_a, elenco.personagem, elenco.id_elenco
         FROM elenco
         JOIN filme ON (elenco.filme = filme.id)
         JOIN ator ON (elenco.ator = ator.id)`);
        res.json(allAtua.rows)
    } catch (error) {
        console.log(error)
    }
    
})

app.post("/atua",async(req,res) => {
    
    try {
        
        const{filme,ator, personagem} = req.body
        console.log(`filme = ${filme}`)
        const newAtua = await pool.query('INSERT INTO elenco (filme,ator, personagem) VALUES ($1, $2, $3) RETURNING *',[filme,ator,  personagem] );
        
        res.json(newAtua.rows[0])
    } catch (err) {
        //console.log(`1)${err.message}`)
        //console.log(err)
        res.json({fuciona: false})
    }
    
    
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "cliente/build/index.html"));
  });
  

app.listen(port,() => {
    console.log(`o servidor está rodando na porta ${port}`)
})
