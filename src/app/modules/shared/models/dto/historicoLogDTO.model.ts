export interface HistoricoLogDTO {
  id: number;
  dataAcesso: Date;
  usuarioId: number;
  loginIp: string;
  operacao: string;
  tabela: string;
}
