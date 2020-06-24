import { Perfil } from './perfil.model';
import { HistoricoAcesso } from './historicoAcesso.model';

export interface Usuario {
  id?: number;
  cpf: string;
  criado: Date;
  dataNascimento: Date;
  email: string;
  login: string;
  nome: string;
  senha: string;
  imagem?: string;
  status?: number;
  historicosAcesso?: HistoricoAcesso[];
  perfil?: Perfil;
  imageProfile?: string;
}
