const Documento = require('../entities/documento');
const { executeSQL } = require('../external_integrations/baseDatos');

async function findById(idDocumento) {
  const resultado = await executeSQL(
    'SELECT idDocumento, nombreArchivo, rutaArchivo, tipoDocumento, fechaSubida, cedulaUsuario FROM Documento WHERE idDocumento = $1',
    [idDocumento]
  );
  const row = resultado.rows[0];
  return row ? new Documento(row) : null;
}

async function findAll() {
  const resultado = await executeSQL(
    'SELECT idDocumento, nombreArchivo, rutaArchivo, tipoDocumento, fechaSubida, cedulaUsuario FROM Documento'
  );
  return resultado.rows.map((row) => new Documento(row));
}

async function create(documento) {
  const resultado = await executeSQL(
    'INSERT INTO Documento (nombreArchivo, rutaArchivo, tipoDocumento, fechaSubida, cedulaUsuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [documento.nombreArchivo, documento.rutaArchivo, documento.tipoDocumento, documento.fechaSubida, documento.cedulaUsuario]
  );
  return new Documento(resultado.rows[0]);
}

async function update(documento) {
  const resultado = await executeSQL(
    'UPDATE Documento SET nombreArchivo = $1, rutaArchivo = $2, tipoDocumento = $3, fechaSubida = $4, cedulaUsuario = $5 WHERE idDocumento = $6 RETURNING *',
    [documento.nombreArchivo, documento.rutaArchivo, documento.tipoDocumento, documento.fechaSubida, documento.cedulaUsuario, documento.idDocumento]
  );
  return resultado.rows[0] ? new Documento(resultado.rows[0]) : null;
}

async function deleteById(idDocumento) {
  const resultado = await executeSQL(
    'DELETE FROM Documento WHERE idDocumento = $1 RETURNING *',
    [idDocumento]
  );
  return resultado.rows[0] ? new Documento(resultado.rows[0]) : null;
}

const documentoRepositorio = {
  findById,
  findAll,
  create,
  update,
  deleteById,
};

module.exports = documentoRepositorio;