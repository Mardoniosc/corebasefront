import { Permissoes } from './permissoes.model';

export interface Perfil {
  id: number;
  nome: string;
  permissoes?: Permissoes[];
}
