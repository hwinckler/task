import { Injectable } from '@angular/core';
import { StitchService } from './stitch.service';

const COLLECTION = 'tasks';

@Injectable()
export class TaskService {

  constructor(
    private _provider: StitchService
  ) { }

  public getAll(): Promise<any[]> {
    return this._provider.authenticate().then(() =>{
        return this._provider.getDB().collection(COLLECTION).find({}).then(r => {
            return r.map(e => {
              return e;
            });
        });
    });
  } 
  public insert(tasks: any): Promise<Boolean> {
    return this._provider.authenticate().then(() =>{
        return this._provider.getDB().collection(COLLECTION).insert(tasks).then(r => {
          return r.insertedIds.length;
        });
    })
  }
  public delete(task: any): Promise<Boolean> {
    return this._provider.authenticate().then(() =>{
        return this._provider.getDB().collection(COLLECTION).deleteOne(task).then(r => {
          return r.deletedCount;
        })
    })
  }     
}
