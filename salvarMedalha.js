import { supabase } from './supabaseClient';

// IDs Oficiais dos Mentores cadastrados no seu Supabase
export const MENTORES = {
  TURING: 'c34d99b5-8a92-44f4-8a2b-8b55c25962cf',
  ADA: '4986b270-4f2f-42e4-8974-169b0c2ffc77',
  TESLA: '1b556232-543d-4d6d-833a-89bd1a1cca7f'
};

/**
 * Registra quando um jovem ganha a medalha de um dos mentores.
 * @param {string} usuarioId - O UUID do jovem logado (da tabela perfis_usuarios)
 * @param {string} mentorId - O ID do mentor (Use MENTORES.TURING, MENTORES.ADA ou MENTORES.TESLA)
 */
export async function registrarConquistaMentor(usuarioId, mentorId) {
  const { data, error } = await supabase
    .from('historico_medalhas') // Nome exato da sua tabela de histórico
    .insert([
      { 
        id_usuario: usuarioId, 
        id_medalha: mentorId 
      }
    ]);

  if (error) {
    console.error('Erro ao salvar conquista no Supabase:', error.message);
    return { success: false, error: error.message };
  }

  console.log('Conquista salva com sucesso para combater a evasão!');
  return { success: true, data };
}