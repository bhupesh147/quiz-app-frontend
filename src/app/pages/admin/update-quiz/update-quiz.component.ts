import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {


  qId:any=0;
  quiz:any;
  categories:any;

  constructor(
    private _quiz:QuizService,
    private _rout:ActivatedRoute,
    private _cate:CategoryService,
    private _router:Router,
    ){

  }

  ngOnInit(): void {
    this.qId=this._rout.snapshot.params['qId'];
    //alert(this.qId);
    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      });

      this._cate.categories().subscribe(
        (data:any)=>{
          this.categories=data;
        },
        (error)=>{
          console.log(error);
        });
  }

  public updateData(){
   // alert("test");
   //validation

   this._quiz.updateQuiz(this.quiz).subscribe(
    (data:any)=>{
      Swal.fire('Success','Quiz updated','success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });
    },
    (error)=>{
      Swal.fire('Error','Error occured while updating quiz','error');
    });
  }

}
