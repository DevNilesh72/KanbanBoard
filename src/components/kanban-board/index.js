import React from "react";
import "./index.css";

export default function KanbanBoard(props) {
  const [newTask, setNewTask] = React.useState("");

  const [tasks, setTasks] = React.useState([
    { name: "1", stage: 0 },
    { name: "2", stage: 0 },
    { name: "3", stage: 0 },
    { name: "4", stage: 0 },
  ]);

  const [stagesNames, setStagesNames] = React.useState([
    "Backlog",
    "To Do",
    "Ongoing",
    "Done",
  ]);

  const stagesTasks = React.useMemo(() => {
    let stages = Array.from({ length: stagesNames.length }, (e) => Array(0));
    tasks.map((e, index) => {
      stages[e.stage].push({ ...e, id: index });
    });

    return stages;
  }, [tasks]);

  function createTask() {
    if (newTask !== "") {
      setTasks((prev) => [...prev, { name: newTask, stage: 0 }]);
      setNewTask("");
    }
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((e, index) => index !== id));
  }

  function incTask(id) {
    setTasks((prev) => {
      if (prev[id].stage < stagesNames.length - 1) {
        prev[id].stage++;
        return [...prev];
      } else {
        return prev;
      }
    });
  }

  function decTask(id) {
    setTasks((prev) => {
      if (prev[id].stage > 0) {
        prev[id].stage--;
        return [...prev];
      } else {
        return prev;
      }
    });
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          onClick={createTask}
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((tasks, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stagesNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {tasks.map((task, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {task.name}
                          </span>
                          <div className="icons">
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-back`}
                              onClick={() => decTask(task.id)}
                            >
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-forward`}
                              onClick={() => incTask(task.id)}
                            >
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2"
                              data-testid={`${task.name
                                .split(" ")
                                .join("-")}-delete`}
                              onClick={() => deleteTask(task.id)}
                            >
                              <i className="material-icons">delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
