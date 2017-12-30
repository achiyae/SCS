import {EventEmitter, Injectable, Output} from '@angular/core';

export interface Domain {
  name: string;
  requirements: Requirement[];
}

export interface User {
  email: string;
  code: string;
  phase: number;
  domain: Domain;
  annotations: Annotation[];
}

export interface Requirement {
  id: number;
  description: string;
  domain: Domain;
}

export interface Annotation {
  position: number;
  length: number;
  user: User;
  requirement: Requirement;
}

@Injectable()
export class OrmService {
  public user: User;
  @Output() userChanged = new EventEmitter<User>();
  public domains: Domain[];
  public domain: Domain;
  @Output() domainChanged = new EventEmitter<Domain>();

  constructor() {
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
