import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserSeviceService } from 'src/app/services/user-sevice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    constructor(private userSevice:UserSeviceService,private snack:MatSnackBar){

    }
    durationInSeconds = 5;
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  }

formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username==null){
     //alert('Username is required!!');
     this.snack.open('Username is required!!', '',{
      duration:3000,
     });
      return;
    }

    this.userSevice.adduser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
       // alert('success');
       Swal.fire('Success','user id is '+data.id,'success');
      },
      (error)=>{
        console.log(error);
       // alert('something went wrong');
       this.snack.open('something went wrong!!','',{
        duration:3000,
       });
      }
    )
}



}


