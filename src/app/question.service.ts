import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './services/helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qId: any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  public getQuestionsOfQuizForTest(qId: any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`);
  }

public addQuestion(question:any){
  return this._http.post(`${baseUrl}/question/`,question);
}

public deleteQuestion(questionId:any){
  return this._http.delete(`${baseUrl}/question/${questionId}`);
}
//eval quiz
public evalQuiz(questions:any){
  return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
}
}
