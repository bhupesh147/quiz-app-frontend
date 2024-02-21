import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;
  
  constructor(private _rout:ActivatedRoute,private _quiz:QuizService){

  }

  ngOnInit(): void {
    this._rout.params.subscribe(
      (params:any)=>{
        this.catId=params['catId'];

        if(this.catId==0){
          this._quiz.getActiveQuizzes().subscribe(
            (data:any)=>{
              this.quizzes=data;
            },
            (error)=>{
               console.log(error);
               alert("error in loading all quizzes");
            });
        }else{
          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
            (data:any)=>{
              this.quizzes=data;
            },
            (error)=>{
              alert("Error in loading quiz");
            });
        }

      });

   
  }

}
