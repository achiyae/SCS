import {EventEmitter, Injectable, Output} from '@angular/core';
import {isNewline} from 'codelyzer/angular/styles/cssLexer';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import Annotation from '../models/annotation.model';
import Domain from '../models/domain.model';
import Group from '../models/group.model';
import Phase from '../models/phase.model';
import Requirement from '../models/requirement.model';
import User from '../models/User.model';

@Injectable()
export class OrmService {
  private api_url = 'http://localhost:3000/api/';
  public user: User;
  @Output() domains: {[name: string]: Domain};
  @Output() userChanged = new EventEmitter<User>();
  @Output() domainChanged = new EventEmitter<Domain>();

  constructor(private http: HttpClient) {
    /* this.domains = { 'ATM': {
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
    }};*/
  }

  create(type:String, data:any): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.api_url+type}`, data);
  }

  read<T>(type:String): Observable<T[]> {
    return this.http.get(this.api_url+type)
    .map(res  => {
      //Maps the response object sent from the server
      return res["data"].docs as T[];
    })
  }

  update(type:String, data:any) {
    //returns the observable of http put request 
    return this.http.put(`${this.api_url+type}`, data);
  }

  delete(type:String, id:string):any {
    //Delete the object by the id
    return this.http.delete(`${this.api_url}/${type}/${id}`)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}