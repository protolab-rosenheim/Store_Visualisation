import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { BaseHttpProvider } from '../BaseHttpProvider';
import { Config } from 'ionic-angular';

/*
  Generated class for the BoardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BoardProvider extends BaseHttpProvider {

  ressourceName: string = "board";

  constructor(public http: HttpClient,
    public config: Config) {
    super(http, config);
  }

  getBoards(): Observable<WebserviceResponse<Board>> {
    let url = `${this.getServiceUrl()}${this.ressourceName}`;
    return this.http.get<WebserviceResponse<Board>>(url);
  }

}
