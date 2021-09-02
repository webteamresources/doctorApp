import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
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
    var finalPath = this.apiPath + keypath;

    var result = this.httpData.put(finalPath, record)
    return result;
  }
}
