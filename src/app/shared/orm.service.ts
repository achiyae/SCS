import {EventEmitter, Injectable, Output} from '@angular/core';

export interface Domain {
  readonly name: string;
  readonly description: string;
  readonly requirements: {[id: string]: Requirement};
}

export interface User {
  readonly email: string;
  code: string;
  phase: number;
  readonly domain: Domain;
  readonly annotations: {[req_id: string]: Annotation[]};
  readonly phases: {[name: string]: boolean};
}

export interface Requirement {
  readonly id: string;
  readonly description: string;
}

export interface Annotation {
  readonly position: number;
  readonly length: number;
  readonly requirement_id: string;
}

export interface Phase {
  readonly name: string;
  readonly done: boolean;
}

@Injectable()
export class OrmService {
  public user: User;
  public domain: Domain;
  private domains: {[name: string]: Domain};
  @Output() userChanged = new EventEmitter<User>();
  @Output() domainChanged = new EventEmitter<Domain>();

  constructor() {
    this.domains = { 'ATM': {
        name: 'ATM',
        description: '',
        requirements: {
          '1': {id: '1', description: 'Requirement 1'},
          '2': {id: '2', description: 'Requirement 2'}}
    }};
    this.selectDomain('ATM');
    // TODO: DB - init connection, get domains.
  }

  getUser(email: string) {
    // TODO: db stuff;
    // this.user = ...;
    this.userChanged.emit(this.user);
  }

  getDomains() {
    // TODO: db stuff;
    // this.domains = ...;
  }

  selectDomain(domain_name: string) {
    this.domain = this.domains[domain_name];
    this.domainChanged.emit(this.domain);
  }

  addAnnotation(annotation: Annotation) {

  }
}
