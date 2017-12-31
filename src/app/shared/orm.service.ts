import {EventEmitter, Injectable, Output} from '@angular/core';

export interface Domain {
  readonly name: string;
  readonly requirements: Requirement[];
}

export interface User {
  readonly email: string;
  code: string;
  phase: number;
  readonly domain: Domain;
  readonly annotations: Annotation[];
}

export interface Requirement {
  readonly id: number;
  readonly description: string;
  readonly domain: Domain;
}

export interface Annotation {
  readonly position: number;
  readonly length: number;
  readonly user: User;
  readonly requirement: Requirement;
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
        requirements: [
          {id: 1, description: 'Requirement 1', domain: this.domain},
          {id: 2, description: 'Requirement 2', domain: this.domain}
        ]
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
}
