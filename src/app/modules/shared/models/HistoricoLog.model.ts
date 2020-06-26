import { Usuario } from './usuario.model';

export interface HistoricoLog {
  id: number;
  dataAcesso: Date;
  tabela: string;
  operacao: string;
  usuario: Usuario;
  loginIp: string;
}
