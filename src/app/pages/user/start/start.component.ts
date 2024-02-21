import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {


  qId:any;
  questions:any;
  marksGot:any=0;
  correctAnswer:any=0;
  attempted:any=0;
  isSubmit:any=false;
  timer:any;

  
  constructor(
    private locationSt:LocationStrategy,
    private _rout:ActivatedRoute,
    private _question:QuestionService){

  }

  ngOnInit(): void {
    this.priventBackButton();
    this.qId=this._rout.snapshot.params['qId'];
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        console.log(this.questions);

        this.timer=this.questions.length*2*60;

        // this.questions.forEach((q:any) => {
        //   q['givenAnswer']='';
        // });
        //startTimer is start now
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading questions !!","error");
      });
  }



  public priventBackButton(){
    history.pushState(null, location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href);
    });
  }

  public submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();

      }
    });
  }

  public startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  public getFormatedType(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  public evalQuiz(){


    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        this.marksGot=Number(data.marksGot).toFixed(2);
        this.correctAnswer=data.correctAnswer;
        this.attempted=data.attempted;
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
      });

  //   this.isSubmit=true;
  //   this.questions.forEach((q:any)=>{
  //     if(q.givenAnswer==q.answer){
  //       this.correctAnswer++;
  //       let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
  //       this.marksGot+=marksSingle;
  //     }

  //     if(q.givenAnswer.trim()!=''){
  //       this.attempted++;
  //     }
      
  //   });

  //    console.log("correct answers:"+this.correctAnswer);
  //     console.log("Marks got"+this.marksGot);
  //     console.log("attemted"+this.attempted);
  //     console.log(this.questions);
   }

   public printPage(){
    window.print();
   }
}
