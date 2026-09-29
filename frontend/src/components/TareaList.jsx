function TareaList({ tareas, onEditar, onEliminar }) {
  if (tareas.length === 0) return <p>No hay tareas todavía.</p>;

  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id}>
          <strong>{tarea.titulo}</strong>
          {tarea.descripcion && <span> — {tarea.descripcion}</span>}
          <button onClick={() => onEditar(tarea)}>Editar</button>
          <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default TareaList;