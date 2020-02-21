import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
    //this.getTestValues();
  }
  getBaseUrl() {
    return 'http://localhost:5002/';
  }

  getValues() {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});
    //this.http.get('http://localhost:5002/api/values', {responseType: 'text', headers})
    this.http.get('http://localhost:5002/api/values')
      .subscribe(data => {
        this.values = data;
      }, error => {
        console.log(error);
      });
  }
  getTestValues(): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});
    return this.http.get('api/values', {responseType: 'text', headers});
 }

}
