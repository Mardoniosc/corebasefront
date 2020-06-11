export interface Permissoes {
  id: number;
  descricao: string;
  url: string;
  permissaoPai?: Permissoes;
}
