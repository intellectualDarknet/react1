export default function TodoTask({ name, columnId, id2 }: { name: string; columnId: string; id2: string }) {
  return (
    <div data-name={name} data-id={id2} data-column-id={columnId} className="task">
      <div className="name">{name}</div>
    </div>  
  );
}