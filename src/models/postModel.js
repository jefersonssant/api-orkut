const pool = require("../config/db");

const listarPosts = async () => {
  return await pool.query(`
                SELECT
                    usuarios.id,
                    usuarios.nome,
                    post.titulo,
                    post.conteudo,
                    post.criado_em,
                    post.id AS post_id
                FROM post
                JOIN usuarios
                ON post.usuario_id = usuarios.id
                ORDER BY post.criado_em DESC
            `);
};

const criarPost = async (titulo, conteudo, usuario_id) => {
  return await pool.query(
    `
          INSERT INTO post (titulo, conteudo, usuario_id)
          VALUES ($1, $2, $3)
          RETURNING *
          `,
    [titulo, conteudo, usuario.id],
  );
};

const buscarPostPorId = async (id) => {
  return pool.query(`SELECT * FROM post WHERE id=$1`, [id]);
};

const atualizarPost = async (titulo, conteudo, id) => {
  return await pool.query(
    `UPDATE post SET titulo=$1, conteudo=$2 WHERE id=$3 RETURNING *`,
    [titulo, conteudo, id],
  );
};

const deletarPost = async (id) => {
  return await pool.query(`DELETE FROM post WHERE id=$1 RETURNING *`, [id]);
};

module.exports = {
    listarPosts,
    criarPost,
    buscarPostPorId,
    atualizarPost,
    deletarPost
}
