import {EventEmitter, Injectable, Output} from '@angular/core';

export interface Domain {
  readonly name: string;
  readonly description: string;
  readonly requirements: {[id: string]: Requirement};
}

export interface User {
  readonly email: string;
  code: string;
  readonly domain: Domain;
  readonly annotations: {[req_id: string]: Annotation[]};
  readonly phases: {[name: string]: boolean};
}

export interface Requirement {
  readonly id: string;
  readonly name: string;
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
  private domains: {[name: string]: Domain};
  @Output() userChanged = new EventEmitter<User>();
  @Output() domainChanged = new EventEmitter<Domain>();

  constructor() {
    this.domains = { 'ATM': {
        name: 'ATM',
        description: '',
        requirements: {
          '1': {id: '1', name: '', description: 'Requirement 1'},
          '2': {id: '2', name: '', description: 'Requirement 2'}}
    }};
  }

  getUser(email: string) {
    // TODO: db stuff (get user from db)
    // this.user = db.getUser();
    if (!this.user) {
      this.user = {
        email: email,
        code: '',
        domain: this.domains['ATM'],
        annotations: {},
        phases: {}
      };
    }
    this.userChanged.emit(this.user);
  }

  getDomains() {
    // TODO: db stuff;
    // this.domains = ...;
  }

  addAnnotation(annotation: Annotation) {

  }
}
