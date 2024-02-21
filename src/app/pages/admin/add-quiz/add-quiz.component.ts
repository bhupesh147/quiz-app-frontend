import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent  implements OnInit{

  categories:any=[];

  quizData:any={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },

  };

  constructor(private _cat:CategoryService,private snack:MatSnackBar,private _quiz:QuizService){

  }

  ngOnInit(): void {
   this._cat.categories().subscribe(
    (data:any)=>{
      this.categories=data;
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error','Error in data loading from server','error');
    });
  }

  public addQuiz(){
    //validation
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this.snack.open("Title Required !!","",{
        duration:3000,
      });
    return;
    }


    //call server

    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','quiz is added','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
          },
        };
      },
      (error)=>{
        Swal.fire('Error','error while adding quiz..','error');
        console.log(error);
      });

  }

}
