import React, { useState } from "react";
import TodoTask from "../todotask/todotask";
import "./todocolumn.css";
import { useDispatchContext, useStateContext } from "../..";

export default function TodoColumn({ name, dataId, tasks }: { name: string; dataId: string; tasks: {name: string, id: string}[] }) {
  const dispatch = useDispatchContext();
  const [isshowForm, setShowForm] = React.useState(false);
  
  function showForm() {
    setShowForm(true);
  }

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taskName = formData.get('task') as string;
    dispatch({ type: 'addNewTask', payload: { columnId: dataId, taskName } });
    setShowForm(false);
  }

  // console.log('tasks', tasks);
  
  return (
    <div className="column" data-id={dataId}>
      <h2>{name}</h2>
      {tasks.length > 0 && tasks.map(task => (
        <TodoTask key={task.id} id2={task.id} name={task.name} columnId={dataId} />
      ))}
      {!isshowForm && (
        <button className="column_add_task" onClick={showForm}>
          +
        </button>
      )}
      {isshowForm && (
        <form className="column_add_task_form" onSubmit={addTask}>
          <input type="text" name="task" placeholder="Task name" />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}