import { supabase } from '../../lib/supabaseClient';

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { usuario_id, desafio_id, sucesso } = body;

    // Conecta na Camada de Dados e joga as informações na tabela
    const { data, error } = await supabase
      .from('historico_desafios') 
      .insert([
        { 
          usuario_id: usuario_id || 'aluno_teste', 
          desafio_id: desafio_id, 
          concluido: sucesso,
          data_conclusao: new Date().toISOString()
        }
      ]);

    if (error) throw error;

    return new Response(JSON.stringify({ mensagem: "Medalha salva com sucesso!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ erro: error.message }), { status: 500 });
  }
};