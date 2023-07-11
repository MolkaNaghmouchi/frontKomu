import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial';


const baseUrl = 'http://localhost:8090/api/tutorials';
@Injectable({
  providedIn: 'root'
})
export class TutorialserviceService {

  constructor(private http: HttpClient) { }



  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }
  

 /* create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }*/



  create(data: any ): Observable<any> {
    return this.http.post(`http://localhost:8080/api/add`, data);
  }



  /*update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }*/

  update(id_tutorial: any, id_theme: any , data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/update/${id_tutorial}/${id_theme}`, data);
  }


  
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }





}
