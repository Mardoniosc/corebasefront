export interface HistoricoAcessoDTO {
  id: number;
  dataAcesso: Date;
  usuarioId: number;
  loginIp?: string;
}
