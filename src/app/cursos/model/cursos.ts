import { Aulas } from "./aulas";

export interface Cursos {
  _id: string;
  nome: string;
  categoria: string;
  aulas: Aulas[];
}
