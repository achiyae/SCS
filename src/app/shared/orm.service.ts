import { Injectable } from '@angular/core';
import * as orm from 'orm';
// import * as sqlite from 'sqlite3';

@Injectable()
export class OrmService {
  private db;
  private sqlite;
  private userModel: orm.model;
  private requirementModel: orm.model;
  private domainModel: orm.model;
  private annotationModel: orm.model;

  constructor() {

  }

  getUser(email: string) {
    return this.userModel.get(email, function(err, user) {
      if (!err) { return user; } });
  }

  addUser(email: string) {
    return this.userModel.create({ email }, function(err, user) {
      if (err) {
        throw err;
      }
      return user;
    });
  }
}
