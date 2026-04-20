const Chatbot = require('../entities/chatbot');
const { executeSQL } = require('../external_integrations/baseDatos');

async function findById(idConsulta) {
  const result = await executeSQL(
    'SELECT idConsulta, cedula_cliente, preguntaUsuarios, respuestaIA, fecha FROM Chatbot WHERE idConsulta = $1',
    [idConsulta]
  );
  const row = result.rows[0];
  return row ? new Chatbot(row) : null;
}

async function findAll() {
  const result = await executeSQL(
    'SELECT idConsulta, cedula_cliente, preguntaUsuarios, respuestaIA, fecha FROM Chatbot'
  );
  return result.rows.map((row) => new Chatbot(row));
}

async function create(chatbot) {
  const result = await executeSQL(
    'INSERT INTO Chatbot (cedula_cliente, preguntaUsuarios, respuestaIA, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
    [chatbot.cedula_cliente, chatbot.preguntaUsuarios, chatbot.respuestaIA, chatbot.fecha]
  );
  return new Chatbot(result.rows[0]);
}

async function update(chatbot) {
  const result = await executeSQL(
    'UPDATE Chatbot SET cedula_cliente = $1, preguntaUsuarios = $2, respuestaIA = $3, fecha = $4 WHERE idConsulta = $5 RETURNING *',
    [chatbot.cedula_cliente, chatbot.preguntaUsuarios, chatbot.respuestaIA, chatbot.fecha, chatbot.idConsulta]
  );
  return result.rows[0] ? new Chatbot(result.rows[0]) : null;
}

async function deleteById(idConsulta) {
  const result = await executeSQL(
    'DELETE FROM Chatbot WHERE idConsulta = $1 RETURNING *',
    [idConsulta]
  );
  return result.rows[0] ? new Chatbot(result.rows[0]) : null;
}

const chatbotRepositorio = {
  findById,
  findAll,
  create,
  update,
  deleteById,
};

module.exports = chatbotRepositorio;