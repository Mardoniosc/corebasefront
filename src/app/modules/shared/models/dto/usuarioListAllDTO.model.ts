export interface UsuarioListAllDTO {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  login: string;
  dataNascimento: Date;
  imagem: string;
  perfil?: string;
}
