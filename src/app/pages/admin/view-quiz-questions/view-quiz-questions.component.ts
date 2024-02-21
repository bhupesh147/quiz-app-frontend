import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.scss']
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId:any;
  qTitle:any;
  question:any=[];


  constructor(private _rout:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar){

  }

  ngOnInit(): void {
  this.qId= this._rout.snapshot.params['qId'];
  this.qTitle = this._rout.snapshot.params['qTitle'];
  this._question.getQuestionsOfQuiz(this.qId).subscribe(
    (data:any)=>{
      this.question=data;
      console.log(this.question);
    },
    (error)=>{
      console.log(error);
    });
  }

  public deleteQuestion(questionId:any){
    
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question ?',
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(questionId).subscribe(
          (data:any)=>{
            this._snack.open('Question Deleted ','',{
              duration:3000,
            });
          },
          (error)=>{
            this._snack.open('error occured ','',{
              duration:3000,
          });
          this.question=this.question.filter((q:any)=>q.quesId!=questionId);
      });
      // (error: any)=>{
      //    this._snack.open('error in deleting question','',{
      //     duration:3000,
      //    });
      //    console.log(error);
      // });
    }
    });
  }
}
