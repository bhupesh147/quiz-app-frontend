import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginData:any={
  username:'',
  password:'',
  };
  //loginStatusSubject:any;

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router){}

  ngOnInit():void{

  }

  formSubmit(){
    console.log('login btn clicked');
    if(this.loginData.username.trim()=='' || this.loginData.username==null){

      this.snack.open('Username is required !!','',{
        duration:3000,
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){

      this.snack.open('Password is required !!','',{
        duration:3000,
      });
      return;
    }

    //request to server generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);
        
        //login...
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
        (user:any)=>{
          this.login.setUser(user);
          console.log(user);
          //redirect ... Admin or Normal user
          if(this.login.getUserRole()=='ADMIN'){
            //admin dashboard
           window.location.href='/admin';
           this.router.navigate(['admin'])
          //  this.loginStatusSubject.next(true);

          }else if(this.login.getUserRole()=='NORMAL'){
             //user dashboard
             window.location.href='/user-dashboard/0';
             this.router.navigate(['user-dashboard'])
            //  console.log("next value is: "+this.loginStatusSubject.next(true));
            //  this.loginStatusSubject.next(true);

          }else{
            this.login.logout();
          }
        });
      },

      (error)=>{
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid detail !! try again...', '',{
          duration:3000,
        });
      });
  }

}
