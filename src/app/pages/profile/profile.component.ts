import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user : any=null;

  constructor(private login:LoginService){

  }

  ngOnInit(): void {
    this.user = this.login.getUser();

    //load data from server
  //   this.login.getCurrentUser().subscribe(
  //     (user:any)=>{
  //       this.user;
  //     },
  //     (error)=>{
  //       alert('error');
  //     } );
   }

}
