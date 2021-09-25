import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  public fireConfig = {
    apiKey: "AIzaSyDFMqjzPFcxmGjRj9SLFzhqDWSBtLzdeuo",
    authDomain: "doctorapp-324906.firebaseapp.com",
    databaseURL: "https://doctorapp-324906-default-rtdb.firebaseio.com",
    projectId: "doctorapp-324906",
    storageBucket: "doctorapp-324906.appspot.com",
    messagingSenderId: "987221160028",
    appId: "1:987221160028:web:4bd7dbb164f47072983699"
  };


  public apiPath: any = 'http://localhost:3000/';

  constructor(private httpData: HttpClient) { }

  getData(apiParameter: any) {
    var finalPath = this.apiPath + apiParameter;
    var result = this.httpData.get(finalPath);
    return result;
  }
  postData(keypath: any, record: any) {
    var finalPath = this.apiPath + keypath;

    var result = this.httpData.post(finalPath, record)
    return result;
  }
  updateData(keypath: any, record: any) {
    //collection nam + key:ID
    var finalPath = this.apiPath + keypath;

    var result = this.httpData.put(finalPath, record)
    return result;
  }
}
