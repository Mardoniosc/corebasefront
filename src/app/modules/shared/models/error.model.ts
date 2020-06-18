import { ErroDTO } from './dto';

export interface ErroGeral {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: Date;
  errors: ErroDTO[];
}
