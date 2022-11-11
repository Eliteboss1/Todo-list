import React, { useEffect, useState } from "react";
import "./todo.css";
import { Add, CheckBoxOutlineBlank, Search } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Divider } from "@mui/material";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [listStyle, setListStyle] = useState("all");
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = document.getElementById("add").value;
      setTodos((t) => [...t, { id: todos.length, title: value, done: false }]);
      setAllTodos((t) => [
        ...t,
        { id: todos.length, title: value, done: false },
      ]);
      document.getElementById("add").value = "";
    }
  };
  const handleClick = (id) => {
    const newState = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: true };
      }
      return todo;
    });

    setTodos(newState);
    setAllTodos(newState);
  };

  useEffect(() => {
    switch (listStyle) {
      case "all":
        setTodos(allTodos);
        break;
      case "active":
        setTodos(allTodos.filter((x) => !x.done));
        break;
      case "done":
        setTodos(allTodos.filter((x) => x.done));
        break;
    }
  }, [listStyle]);
  console.log(todos);
  return (
    <div className="todo">
      <div className="container">
        <div className="inside">
          <div className="header">THINGS TO DO</div>
          <form className="content">
            <input
              type="text"
              id="add"
              class="focus"
              placeholder="Add New"
              onKeyDown={handleKeypress}
            />
          </form>
          <div className="inputSection">
            {todos.length > 0 &&
              todos.map((todo) => {
                return (
                  <div>
                    <span
                      className="filling"
                      onClick={() => handleClick(todo.id)}
                    >
                      {todo.done ? (
                        <CheckBoxIcon className="check" />
                      ) : (
                        <CheckBoxOutlineBlank className="check" />
                      )}
                      <span className="txt">{todo.title}</span>
                    </span>
                    <Divider className="line" />
                  </div>
                );
              })}
          </div>
        </div>
        <footer>
          <div className="icons">
            <Add className="add" />
            <Search className="search" />
            <Divider orientation="vertical" className="Vertical" />
            <span className="ftxt"> 3 items left</span>
          </div>
          <div className="rightSide">
            <span className="all" onClick={() => setListStyle("all")}>
              All
            </span>
            <span className="active" onClick={() => setListStyle("active")}>
              Active
            </span>
            <span className="complected" onClick={() => setListStyle("done")}>
              Complected
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
