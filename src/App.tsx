import { createContext, useContext, useReducer, useState } from "react";
import TodoColumn from "./components/todocolumn/todocolumn";
import './App.css';
import { useDispatchContext, useStateContext } from ".";

function App() {
  const [showInput, setShowInput] = useState(false)
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
  const [initialCoordinates, setInitialCoordinates] = useState({ x: 0, y: 0 })
  
  const state = useStateContext();
  const dispatch = useDispatchContext();

  function addNewColumn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taskName = formData.get('taskName') as string;
    dispatch({ type: 'addNewColumn', payload: taskName });
    setShowInput(false);
  }

  function mouseDownFn(e: React.MouseEvent<HTMLElement>) {
    if (!selectedElement) {
      const element = (e.target as HTMLElement)
      const closest = element.closest('.task')  as HTMLElement | null

      if (closest) {
        closest.style.position = 'relative'
        setSelectedElement(closest)
        setInitialCoordinates({ x: e.clientX, y: e.clientY })
      }
    }
  }

  function coordinatesFn(e: React.MouseEvent<HTMLElement>) {
    // console.log('coordinates:', { x: e.clientX, y: e.clientY });
    setCoordinates({ x: e.clientX, y: e.clientY })
    if (selectedElement) {
      selectedElement.style.left = e.clientX + 'px'
      selectedElement.style.top = e.clientY + 'px'
    }
  }

  function onMouseUpFn(e: React.MouseEvent<HTMLElement>) {
    if (selectedElement) {
      const element = (e.target as HTMLElement)
      const closest = element.closest('.column')  as HTMLElement | null
      const closestTask = element.closest('.task')  as HTMLElement | null
        if (closest?.getAttribute('data-id') !== selectedElement.getAttribute('data-id')) {
          // dispatch({ type: 'addNewTask', payload: { columnId: closest?.getAttribute('data-id'), taskName: selectedElement.getAttribute('data-name') } })
          console.log({ fromColumnId: selectedElement.getAttribute('data-column-id'), toColumnId: closest?.getAttribute('data-id'), taskId: selectedElement.getAttribute('data-id') })
          dispatch({ type: 'moveTask', payload: { fromColumnId: selectedElement.getAttribute('data-column-id'), toColumnId: closest?.getAttribute('data-id'), taskId: selectedElement.getAttribute('data-id'), taskName: selectedElement.getAttribute('data-name') } })
        }

          selectedElement.style.position = 'static'
          setSelectedElement(null)
      }
  }

  return (
      <div className="App" onMouseDown={mouseDownFn} onMouseMove={coordinatesFn} onMouseUp={onMouseUpFn}>
        {/* <Header />
        <Content/> */}
        {state.records.length > 0 && state.records.map(record => <TodoColumn key={record.id} tasks={record.tasks} name={record.name} dataId={record.id} />)}
        <div className = "addButton">
          {!showInput && <button onClick={() => setShowInput(true)}>
            Toggle Burger
          </button>}
          {showInput && (
            <form className="column_add_task_form" onSubmit={addNewColumn}>
              <input type="text" name="taskName" placeholder="Task name" />
              <button type="submit">Add</button>
            </form>
          )}
        </div>

      </div>
  );
}

export default App;
