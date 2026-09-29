import { useState, useEffect } from 'react';

function TareaForm({ onGuardar, tareaEditando, onCancelar }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (tareaEditando) {
      setTitulo(tareaEditando.titulo);
      setDescripcion(tareaEditando.descripcion || '');
    } else {
      setTitulo('');
      setDescripcion('');
    }
  }, [tareaEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onGuardar({ titulo, descripcion });
    setTitulo('');
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">{tareaEditando ? 'Actualizar' : 'Crear'}</button>
      {tareaEditando && (
        <button type="button" onClick={onCancelar}>Cancelar</button>
      )}
    </form>
  );
}

export default TareaForm;