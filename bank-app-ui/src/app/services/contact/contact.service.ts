import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../../model/user.model";
import { environment } from '../../../environments/environment';
import { AppConstants } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  createNewUser(user : User){
    return this.http.post(environment.rooturl+AppConstants.CONTACT_API_URL,user);
  }
}
