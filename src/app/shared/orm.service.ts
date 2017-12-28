import { Injectable } from '@angular/core';
import * as orm from 'orm';

@Injectable()
export class OrmService {
  private ormService;
  public user: orm.model;
  public requirement: orm.model;
  public domain: orm.model;

  constructor() {
    this.ormService = orm.connect('localhost',
      function (connect_err, db) {
        if (connect_err) {
          throw connect_err;
        }

        this.domain = db.define('domain', {
          name: {type: 'text', key: true},
        });

        this.requirement = db.define('requirement', {
          id: {type: 'integer', key: true},
          description: String,
        });
        this.requirement.hasOne('domain', this.domain, { required: true });

        this.user = db.define('user', {
          email: {type: 'text', key: true},
          code: String,
          phase: {type: 'integer'},
        });
        this.user.hasOne('domain', this.domain, { required: true });

        const annotation = db.define('annotation', {
          position: {type: 'integer'},
          length: {type: 'integer'},
        });
        annotation.hasOne('requirement', this.requirement, { required: true });
        annotation.hasOne('user', this.user, { required: true });
      });
  }

  getUser(email: string) {
    return this.user.find({ email: email}).limit(1);
  }
}
