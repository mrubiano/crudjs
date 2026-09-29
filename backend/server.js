require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase = require('./supabaseClient');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ---- Rutas del CRUD ----

// Crear
app.post('/tareas', async (req, res) => {
  const { titulo, descripcion } = req.body;
  const { data, error } = await supabase
    .from('tareas')
    .insert([{ titulo, descripcion }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Listar todas
app.get('/tareas', async (req, res) => {
  const { data, error } = await supabase.from('tareas').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Leer una
app.get('/tareas/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('tareas')
    .select('*')
    .eq('id', req.params.id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Actualizar
app.put('/tareas/:id', async (req, res) => {
  const { titulo, descripcion, completada } = req.body;
  const { data, error } = await supabase
    .from('tareas')
    .update({ titulo, descripcion, completada })
    .eq('id', req.params.id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Eliminar
app.delete('/tareas/:id', async (req, res) => {
  const { error } = await supabase
    .from('tareas')
    .delete()
    .eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

// ---- Arrancar servidor ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});