import {EventEmitter, Injectable, Output} from '@angular/core';
import {isNewline} from 'codelyzer/angular/styles/cssLexer';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

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
  private api_url = 'http://localhost:3000';
  private userUrl = `${this.api_url}/api/user`;
  public user: User;
  @Output() domains: {[name: string]: Domain};
  @Output() userChanged = new EventEmitter<User>();
  @Output() domainChanged = new EventEmitter<Domain>();

  constructor(private http: HttpClient) {
    this.domains = { 'ATM': {
        name: 'ATM',
        description: 'Key features: \n' +
        'The system is always on. \n' +
        'The system does not operate without a valid credit card and a matching PIN code.\n' +
        'The system provides the following services: \n' +
        'Withdrawal with a receipt.\n' +
        'Withdrawal without a receipt.\n' +
        'Credit information.\n' +
        'Business and integrity rules:\n' +
        'A client has:\n' +
        'First name and last name\n' +
        'A credit card.\n' +
        'A credit card has:\n' +
        'The client first and last name.\n' +
        'A unique identifier.\n' +
        'A bank account identifier.\n' +
        'A bank account has:\n' +
        'The client details (i.e., name, id, etc.)\n' +
        'A list of linked credit card.\n' +
        'The credit balance.  \n' +
        'The ATM machine is:\n' +
        'Always on and connected to the banking network.\n' +
        'Accepts any valid credit card.\n',
        requirements: {
          '1': {id: '1', name: 'Requirement 1', description: 'While not in use, the system display a welcome screen.'},
          '2': {id: '2', name: 'Requirement 2', description: 'When a welcome screen is displayed, the system reacts only to the insertion of a credit card.'},
          '3': {id: '3', name: 'Requirement 3.1', description: 'Once a credit card is inserted and matching PIN code is given, the system returns the credit card and display the following options: Withdrawal with a receipt.'},
          '4': {id: '4', name: 'Requirement 3.2', description: 'Once a credit card is inserted and matching PIN code is given, the system returns the credit card and display the following options: Withdrawal without a receipt.'},
          '5': {id: '5', name: 'Requirement 3.3', description: 'Once a credit card is inserted and matching PIN code is given, the system returns the credit card and display the following options: Credit information.'},
          '6': {id: '6', name: 'Requirement 4.1', description: 'Withdrawal: The user can request to withdrawal one of the following amount of money: 50, 100, 200, 500, 1000, or a custom amount.'},
          '7': {id: '7', name: 'Requirement 4.2.1', description: 'Withdrawal: The action succeeds only if : The amount is smaller than 2000'},
          '8': {id: '8', name: 'Requirement 4.3.1.1', description: 'If the cash is taken: If the user chose to withdraw with a receipt, print out a receipt which includes: The client details: name and bank account number.'},
          '9': {id: '9', name: 'Requirement 4.3.1.2', description: 'If the cash is taken: If the user chose to withdraw with a receipt, print out a receipt which includes: The client details: The time of which the withdrawal took a place.'},
          '10': {id: '10', name: 'Requirement 4.3.1.3', description: 'If the cash is taken: If the user chose to withdraw with a receipt, print out a receipt which includes: The client details: The amount of money that was withdrawn.'},
          '11': {id: '11', name: 'Requirement 4.3.2', description: 'If the cash is taken: End the session.'},
          '12': {id: '12', name: 'Requirement 5.1.1', description: 'Credit information: If the user chooses “Credit information” the system will display: The client details: name and bank account number.'},
          '13': {id: '13', name: 'Requirement 5.1.2', description: 'Credit information: If the user chooses “Credit information” the system will display: The account balance.'},
          '14': {id: '14', name: 'Requirement 5.1.3', description: 'Credit information: If the user chooses “Credit information” the system will display: The current date and time.'},
          '15': {id: '15', name: 'Requirement 5.2', description: 'Credit information: The information will be displayed for 15 seconds and then the session will end.'},
          '16': {id: '16', name: 'Requirement 6.1', description: 'End the session if one of the following happens: The operation ended successfully.'},
          '17': {id: '17', name: 'Requirement 6.2', description: 'End the session if one of the following happens: On any error (wrong PIN or invalid amount of money).'},
        }
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
    this.userChanged.emit(this.user); // Why?
  }

  setUserCode(coder: string) {
      this.user.code = coder;
  }

  getDomains() {
    // TODO: db stuff;
    // this.domains = ...;
  }

  getUserCode() {
    return this.user.code;
  }

  addAnnotation(annotation: Annotation) {

  }
}
