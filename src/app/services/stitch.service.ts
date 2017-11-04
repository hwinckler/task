import { Injectable } from '@angular/core';
import { StitchClient } from 'mongodb-stitch';
import { APP_ID, MONGODB, MONGDB_SERVICE, DB, API_KEY, API_KEY_ID } from './stitch.const';

@Injectable()
export class StitchService {

  private _stitchClient: StitchClient;
  private _db;

  constructor(){
      this._stitchClient = new StitchClient(APP_ID);
  }

  public getDB(){
      this._db = this._db || this._stitchClient.service(MONGODB, MONGDB_SERVICE).db(DB);
      return this._db;
  }

  private getClient(): StitchClient{
    return this._stitchClient;
  }

  public authenticate(){
     return this.getClient().authenticate(API_KEY, API_KEY_ID);    
  }  

}
