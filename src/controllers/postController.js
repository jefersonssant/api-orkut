const postModel = require("../models/postModel");

const listarPosts = async (req, res) => {
    try {
        const resultado = await postModel.listarPosts();
        res.json(resultado.rows);
      } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro ao buscar postagens" });
      }
}

const criarPost = async (req, res) => {
    try {
        const { titulo, conteudo } = req.body;
        const resultado = await postModel.criarPost(
            titulo,
            conteudo,
            req.usuario.id
        )
        res.status(201).json({
          mensagem: "Post criado com sucesso",
          post: resultado.rows[0],
        });
      } catch (erro) {
        res.status(500).json({
          erro: "Erro ao criar postagem",
        });
      }
}

const atualizarPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, conteudo } = req.body;
    
        const post = await postModel.buscarPostPorId(id)
    
        if (post.rows.length === 0) {
          return res.status(404).json({mensagem: "Post não encontrado"})
        };
    
        if (post.rows[0].usuario_id !== req.usuario.id) {
          return res.status(403).json({mensagem: "Sem permissão"})
        };
    
        const resultado = await postModel.atualizarPost(
            titulo,
            conteudo,
            id
        )
        res.status(200).json({
          mensagem: "Post atualizado com sucesso",
          post: resultado.rows[0],
        });
      } catch (erro) {
        res.status(500).json({
          erro: "Erro ao atualizar post",
        });
      }
}

const deletarPost = async (req, res) => {
    try {
        const { id } = req.params;
    
        const post = await postModel.buscarPostPorId(id)
    
        if (post.rows.length === 0) {
          return res.status(404).json({mensagem: "Post não encontrado"})
        };
    
        if (post.rows[0].usuario_id !== req.usuario.id) {
          return res.status(403).json({mensagem: "Sem permissão"})
        }
    
        const resultado = await postModel.deletarPost(id)
    
        res.json({
          mensagem: "Post deletado com sucesso",
          post: resultado.rows[0],
        });
      } catch (erro) {
        res.status(500).json({
          erro: "Erro ao deletar post",
        });
      }
}

module.exports = {
    listarPosts,
    criarPost,
    atualizarPost,
    deletarPost
}