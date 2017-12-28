import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Device } from '../../model/device';

@Injectable()
export class DatabaseProvider {

  device = this.db.list<Device>('device');
  constructor(
    public http: HttpClient,
    private  db : AngularFireDatabase
  ) {
    console.log('Hello DatabaseProvider Provider');
  }

  getStatus(){
    return this.device;
  }

  switchDevice(key,device:Device){
    this.device.update(key,device);
  }

}
