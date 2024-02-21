import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit{

  public Editor:any = ClassicEditor;

  qId:any;
  qTitle:any;
  question:any={
    quiz:{

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private _rout:ActivatedRoute,
    private _snack:MatSnackBar,
    private _question:QuestionService){

  }

  ngOnInit(): void {
    this.qId=this._rout.snapshot.params['qId'];
    this.qTitle=this._rout.snapshot.params['qTitle'];
    this.question.quiz['qId'] = this.qId;
    
   
  }

  public formSubmit(){
    if(this.question.content.trim()=='' || this.question.content==null){
     return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2==null){
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null){
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question Added','success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';

      },
      (error)=>{
        Swal.fire('Error','Error Occured while adding question','error');
      }
    )
  }

}
