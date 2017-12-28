import {Requiremnet} from './domain.model';

export class Annotation {
  constructor(public position: number, public length: number, public requirement: Requiremnet) {}
}
