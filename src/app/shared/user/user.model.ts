import {Domain} from '../domain.model';
import {Annotation} from '../annotation.model';

export class User {
  private code: string;
  private phase: 0;
  private domain: Domain;
  private annotations: Annotation;
  private email: string;

  getPhase() {
    return this.phase;
  }

  incPhase() {
    this.phase++;
  }

  getCode() {
    return this.code;
  }

  setCode(code: string) {
    if (code) {
      throw new Error('Cannot override existing code for the user.');
    } else {
      this.code = code;
    }
  }
}
