import { createContext, useContext, useReducer, useState, useEffect } from "react";
import TodoColumn from "./components/todocolumn/todocolumn";
import './App.css';
import { useDispatchContext, useStateContext } from ".";

function App() {
  const [showInput, setShowInput] = useState(false)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const [draggedColumnId, setDraggedColumnId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 })
  const [draggedTaskName, setDraggedTaskName] = useState<string | null>(null)
  
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
    if (!draggedTaskId) {
      const element = (e.target as HTMLElement)
      const closest = element.closest('.task') as HTMLElement | null

      if (closest) {
        const taskId = closest.getAttribute('data-id')
        const columnId = closest.getAttribute('data-column-id')
        const taskName = closest.getAttribute('data-name')
        
        setDraggedTaskId(taskId)
        setDraggedColumnId(columnId)
        setDraggedTaskName(taskName)
        setInitialMousePos({ x: e.clientX, y: e.clientY })
        setDragOffset({ x: 0, y: 0 })
      }
    }
  }

  // Attach/detach document listeners only when dragging
  useEffect(() => {
    if (!draggedTaskId) return;

    function coordinatesFn(e: MouseEvent) {
      const offsetX = e.clientX - initialMousePos.x
      const offsetY = e.clientY - initialMousePos.y
      setDragOffset({ x: offsetX, y: offsetY })
    }

    function onMouseUpFn(e: MouseEvent) {
      const element = (e.target as HTMLElement)
      const closest = element.closest('.column') as HTMLElement | null

      if (closest?.getAttribute('data-id') !== draggedColumnId) {
        console.log({ 
          fromColumnId: draggedColumnId, 
          toColumnId: closest?.getAttribute('data-id'), 
          taskId: draggedTaskId 
        })
        dispatch({ 
          type: 'moveTask', 
          payload: { 
            fromColumnId: draggedColumnId, 
            toColumnId: closest?.getAttribute('data-id'), 
            taskId: draggedTaskId, 
            taskName: draggedTaskName 
          } 
        })
      }

      setDraggedTaskId(null)
      setDraggedColumnId(null)
      setDragOffset({ x: 0, y: 0 })
      setDraggedTaskName(null)
    }

    document.addEventListener('mousemove', coordinatesFn)
    document.addEventListener('mouseup', onMouseUpFn)

    return () => {
      document.removeEventListener('mousemove', coordinatesFn)
      document.removeEventListener('mouseup', onMouseUpFn)
    }
  }, [draggedTaskId, draggedColumnId, initialMousePos, draggedTaskName, dispatch])

  return (
      <div className="App" onMouseDown={mouseDownFn}>
        {/* <Header />
        <Content/> */}
        {state.records.length > 0 && state.records.map(record => (
          <TodoColumn 
            key={record.id} 
            tasks={record.tasks} 
            name={record.name} 
            dataId={record.id}
            draggedTaskId={draggedTaskId}
            dragOffset={dragOffset}
          />
        ))}
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
