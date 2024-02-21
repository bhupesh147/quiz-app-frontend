import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserSeviceService {
  constructor(private http:HttpClient
    ) {}

    

  public adduser(user:any)
  {
    return this.http.post(`${baseUrl}/user/`,user);
  }
  
}
