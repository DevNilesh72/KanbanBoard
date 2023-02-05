import React from "react";
import "./App.css";
import "h8k-components";
import KanbanBoard from "./components/kanban-board";
const title = "React App";

const App = () => {
  return (
    <div className="App">
      <KanbanBoard />
    </div>
  );
};

export default App;
