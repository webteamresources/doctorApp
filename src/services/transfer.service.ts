import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  public obj_userData = new Subject();

  constructor() { }

  userDataToTransfer(dataFromComp: any) {
    this.obj_userData.next(dataFromComp);
  }
}
