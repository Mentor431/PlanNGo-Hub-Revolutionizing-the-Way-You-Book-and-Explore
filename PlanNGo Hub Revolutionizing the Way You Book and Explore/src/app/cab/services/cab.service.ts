// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';


// interface Cab {
//   id: string;
//   type: string;
//   location: string;
//   fareEstimate: number;
//   available: boolean;
//   image: string;  
// }
// @Injectable({
//   providedIn: 'root',
// })
// export class CabService {
//   private apiUrl = 'http://localhost:3000/cabs'; // Mock API URL

//   constructor(private http: HttpClient) {}

//   getCabs(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getCabById(id: string): Observable<any> {
//       return this.http.get<any>(`${this.apiUrl}?id=${id}`); 
//   }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Cab {
  id: string;
  type: string;
  location: string;
  fareEstimate: number;
  available: boolean;
  image: string;  
}
@Injectable({
  providedIn: 'root',
})
export class CabService {
  private apiUrl = 'http://localhost:3000/cabs'; // Mock API URL

  constructor(private http: HttpClient) {}

  getCabs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCabById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);

  }
}