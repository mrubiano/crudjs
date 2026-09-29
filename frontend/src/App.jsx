import { useEffect, useState } from 'react';
import { getTareas, crearTarea, actualizarTarea, eliminarTarea } from './api';
import TareaForm from './components/TareaForm';
import TareaList from './components/TareaList';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);

  const cargarTareas = () => {
    getTareas().then(setTareas).catch(console.error);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleGuardar = async (datos) => {
    if (tareaEditando) {
      await actualizarTarea(tareaEditando.id, datos);
      setTareaEditando(null);
    } else {
      await crearTarea(datos);
    }
    cargarTareas();
  };

  const handleEliminar = async (id) => {
    await eliminarTarea(id);
    cargarTareas();
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h1>Mis tareas</h1>
      <TareaForm
        onGuardar={handleGuardar}
        tareaEditando={tareaEditando}
        onCancelar={() => setTareaEditando(null)}
      />
      <TareaList
        tareas={tareas}
        onEditar={setTareaEditando}
        onEliminar={handleEliminar}
      />
    </div>
  );
}

export default App;