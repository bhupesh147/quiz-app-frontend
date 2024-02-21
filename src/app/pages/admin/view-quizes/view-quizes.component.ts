import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.scss']
})
export class ViewQuizesComponent  implements OnInit{

  quizzes:any=[];

constructor(private _quiz:QuizService){

}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data','error');
      });
  }

  public deletQuiz(qId:any){
    Swal.fire({
      icon:'info',
      title:"Are you sure ?",
      confirmButtonText:"Delete",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){

    this._quiz.deleteQuiz(qId).subscribe(
  (data:any)=>{
   this.quizzes = this.quizzes.filter((_quiz: any)=>this.quizzes.qId!=qId);
    Swal.fire("Success","Quiz deleted successfully !!","success");
  },
  (error)=>{
    console.log(qId);
    Swal.fire("Error","Error in deleting quiz !!","error");
  });
      }
    });

    }
  }




