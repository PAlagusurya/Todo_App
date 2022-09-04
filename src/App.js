import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (event) => {
    //this will prevent the default action of refreshing the page on submission
    event.preventDefault();


    if(editId){
      const editedOne = todos.find((item)=>item.id===editId);
      const updatedTodos = todos.map((element)=>
        element.id === editedOne.id ? element = {id:element.id,todo}
        :{id:element.id,todo:element.todo}
      );
      setTodos(updatedTodos)
      setEditId(0);
      setTodo("");
      return;
    }

    if (todos !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const filteredTodo = todos.filter((item) => item.id !== id);
    setTodos([...filteredTodo]);
  };

  const handleEdit = (id) => {
    const editedTodo = todos.find((item) => item.id === id);
    setTodo(editedTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo Lists of Surya</h1>

        <form className="formStyle" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          ></input>
          <button type="submit">{editId ? "Edit" : "Add"}</button>
        </form>

        <ul className="TodoItems">
          {todos.map((item) => (
            <li className="todoList">
              <span className="todoText" key={item.id}>
                {item.todo}
              </span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
