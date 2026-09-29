const API_URL = 'http://localhost:3000/tareas';

export async function getTareas() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener las tareas');
  return res.json();
}

export async function getTarea(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error al obtener la tarea');
  return res.json();
}

export async function crearTarea(tarea) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  });
  if (!res.ok) throw new Error('Error al crear la tarea');
  return res.json();
}

export async function actualizarTarea(id, tarea) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  });
  if (!res.ok) throw new Error('Error al actualizar la tarea');
  return res.json();
}

export async function eliminarTarea(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar la tarea');
}