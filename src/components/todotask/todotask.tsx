export default function TodoTask({ name, columnId, id2, isDragged, dragOffset }: { name: string; columnId: string; id2: string; isDragged: boolean; dragOffset: { x: number; y: number } }) {
  const style = isDragged ? {
    position: 'fixed' as const,
    left: `${dragOffset.x}px`,
    top: `${dragOffset.y}px`,
    zIndex: 1000,
    pointerEvents: 'none' as const
  } : {};

  return (
    <div data-name={name} data-id={id2} data-column-id={columnId} className="task" style={style}>
      <div className="name">{name}</div>
    </div>  
  );
}