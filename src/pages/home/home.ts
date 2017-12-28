import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Device } from '../../model/device';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  devicelist:Observable<Device[]>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database:DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.devicelist = this.database.getStatus().snapshotChanges()
    .map(changes =>{
          return changes.map( c =>({
            key : c.payload.key , ...c.payload.val()
          }));
    });
    console.log('ionViewDidLoad HomePage : ',this.devicelist);
    
    
  }

  switch(device:Device){
    console.log('Device :',device.control)
    if(device.control==0){
      let d = new Device(1)
      console.log('setDevice :',d.control)
      this.database.switchDevice(device.key,d);
    }else if(device.control==1){
      let d = new Device(0)
      console.log('setDevice :',d.control)
      this.database.switchDevice(device.key,d);
    }
    
  }

}
