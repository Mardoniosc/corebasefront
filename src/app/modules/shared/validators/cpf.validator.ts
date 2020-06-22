/**
 * @author Mardonio S Costa
 * @since 0.0.1
 */
import { AbstractControl } from '@angular/forms';

export class CpfValidator {
  static validate(control: AbstractControl): { [key: string]: boolean } {
    if (this.cpfValido(control.value)) {
      return null;
    }
    return { cpf: true };
  }

  static cpfValido(cpf: any): boolean {
    cpf = !cpf || cpf.replace(/\D/g, '');
    const cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;

    if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {
      return false;
    }

    let x = cpf.length - 1;
    let digitosTemp = 0;
    let e = 0;
    let h = '';

    for (let i = 0; i <= cpf.length - 3; i += 1) {
      digitosTemp = cpf.substring(i, i + 1);
      e += digitosTemp * x;
      x -= 1;
      h += digitosTemp;
    }

    let digitos = 11 - (e % 11);
    if (digitos === 10 || digitos === 11) {
      digitos = 0;
    }

    const cpfSemDigVer = cpf.substring(0, cpf.length - 2) + digitos;
    x = 11;
    e = 0;
    for (let j = 0; j <= cpf.length - 2; j += 1) {
      e += cpfSemDigVer.substring(j, j + 1) * x;
      x -= 1;
    }

    let digVerificador = 11 - (e % 11);
    if (digVerificador === 10 || digVerificador === 11) {
      digVerificador = 0;
    }

    return (
      `${digitos}${digVerificador}` ===
      cpf.substring(cpf.length, cpf.length - 2)
    );
  }
}
