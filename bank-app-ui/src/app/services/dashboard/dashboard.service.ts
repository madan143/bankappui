import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getBillDetails(uniqueSerNum : string){
    return this.http.post(environment.rooturl+AppConstants.DASHBOARD_API_URL,uniqueSerNum);
  }
}
