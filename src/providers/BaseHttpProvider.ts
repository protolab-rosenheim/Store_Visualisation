import { Config } from 'ionic-angular/config/config';
import { HttpClient } from "@angular/common/http";

export class BaseHttpProvider {

  constructor(public http: HttpClient, public config: Config) {

  }

  getServiceUrl(): string {
    if (this.config.get('serviceUrl') !== "") {
      return this.config.get('serviceUrl');
    } else {
      return "http://" + window.location.hostname + ":5000/api/"
    }
  }
}
