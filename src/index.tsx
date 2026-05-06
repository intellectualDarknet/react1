import React, { createContext, useContext, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

type StoringRecord = {
  id: string,
  name: string,
  tasks: {name: string, id: string}[] 
}

type StateType = {
  records: StoringRecord[] 
}

const initialState: StateType = {
  records: []
}

const StateContext = createContext<any>(null);
const DispatchContext = createContext<any>(null);
  
const reducer = (state: StateType, action: any) => {
  console.log('action', action)
  switch (action.type) {
    case 'addNewColumn':
      return { records: [...state.records, { name: action.payload, id: Date.now().toString(), tasks: [] } ] };
    case 'addNewTask': {
      const columnIndex = state.records.findIndex(record => record.id === action.payload.columnId);
      console.log('columnIndex', columnIndex)
      if (columnIndex === -1) {
        return { records: state.records }
      }
      const newRecord = { ...state.records[columnIndex], tasks: [...state.records[columnIndex].tasks, { name: action.payload.taskName, id: Date.now().toString() }] }
      const updatedRecords = [...state.records.slice(0, columnIndex), newRecord, ...state.records.slice(columnIndex + 1)];
      return { records: updatedRecords };
    }

    case 'moveTask': {
      const toColumnIndex = state.records.findIndex(record => record.id === action.payload.toColumnId);
      console.log('toColumnIndex', toColumnIndex)
      if (toColumnIndex === -1) {
        return { records: state.records }
      }
      const newRecord = { ...state.records[toColumnIndex], tasks: [...state.records[toColumnIndex].tasks, { name: action.payload.taskName, id: Date.now().toString() }] }
      const updatedRecords = [...state.records.slice(0, toColumnIndex), newRecord, ...state.records.slice(toColumnIndex + 1)];

      const fromColumnIndex = state.records.findIndex(record => record.id === action.payload.fromColumnId);
      const updatedTasks = updatedRecords[fromColumnIndex].tasks.filter(task => task.id !== action.payload.taskId);
      const updatedRecord = { ...updatedRecords[fromColumnIndex], tasks: updatedTasks };
      const records = [...updatedRecords.slice(0, fromColumnIndex), updatedRecord, ...updatedRecords.slice(fromColumnIndex + 1)];
      return { records };
    }

    case 'removeTask': {
      const columnIndex = state.records.findIndex(record => record.id === action.payload.columnId);
      if (columnIndex === -1) {
        return { records: state.records }
      }
      const updatedTasks = state.records[columnIndex].tasks.filter(task => task.id !== action.payload.taskId);
      const updatedRecord = { ...state.records[columnIndex], tasks: updatedTasks };
      const updatedRecords = [...state.records.slice(0, columnIndex), updatedRecord, ...state.records.slice(columnIndex + 1)];
      return { records: updatedRecords };
    }


    default:
      throw new Error();
  }
}

export const useStateContext = (): StateType => {
  return useContext<StateType>(StateContext)
}

export const useDispatchContext = () => {
  return useContext(DispatchContext)
}

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext value={state}>
      <DispatchContext value={dispatch}>
        {children}
      </DispatchContext>
    </StateContext> 
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
