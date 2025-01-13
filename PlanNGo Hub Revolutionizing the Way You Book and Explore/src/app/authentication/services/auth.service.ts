import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../models/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Register User
  // registerUser(postData: RegisterPostData): Observable<any> {
  //   return new Observable((observer) => {
  //     // Generate the next ID
  //     this.http.get<User[]>(`${this.baseUrl}/users`).subscribe(
  //       (users) => {
  //         const ids = users
  //           .map((user) => parseInt(user.id.replace('PG', ''), 10))
  //           .filter((num) => !isNaN(num));
  //         const maxId = Math.max(0, ...ids);
  //         const nextId = `PG${(maxId + 1).toString().padStart(3, '0')}`;
  //         const userData = { ...postData, id: nextId };

  //         this.http.post(`${this.baseUrl}/users`, userData).subscribe(
  //           (response) => {
  //             observer.next(response);
  //             observer.complete();
  //           },
  //           (error) => observer.error(error)
  //         );
  //       },
  //       (error) => observer.error(error)
  //     );
  //   });
  // }

  registerUser(postData: RegisterPostData): Observable<any> {
    return new Observable((observer) => {
      // Generate the next ID
      this.http.get<User[]>(`${this.baseUrl}/users`).subscribe(
        (users) => {
          const ids = users
            .map((user) => (user.id ? parseInt(user.id.replace('PG', ''), 10) : NaN))
            .filter((num) => !isNaN(num));
          const maxId = Math.max(0, ...ids);
          const nextId = `PG${(maxId + 1).toString().padStart(3, '0')}`;
          const userData = { ...postData, id: nextId };
  
          this.http.post(`${this.baseUrl}/users`, userData).subscribe(
            (response) => {
              observer.next(response);
              observer.complete();
            },
            (error) => observer.error(error)
          );
        },
        (error) => observer.error(error)
      );
    });
  }
  
  // Get User Details for Login
  getUserDetails(email: string, password: string): Observable<User[]> {
    // console.log('hello')
    return this.http.get<User[]>(
      `${this.baseUrl}/users?email=${email}&password=${password}`);
  }

  // Reset Password
  resetPassword(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`).pipe(
      map((users) => users.length > 0) // Check if email exists
    );
  }

  // Check Email Exists
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`).pipe(
      map((users: User[]) => users.length > 0)
    );
  }

  // **Get User Profile**
  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }
  

  // **Update User Profile**
  updateUserProfile(
    userId: string,
    updatedData: Partial<User>
  ): Observable<User> {
    return this.http.put<User>(
      `${this.baseUrl}/users/${userId}`,
      updatedData
    );
  }
  // auth.service.ts (or wherever you handle authentication)
login(userCredentials: any) {
  // Assume we get a response with the user profile after login
  const userId = 'PG009'; // This will be dynamically fetched from backend during login
  sessionStorage.setItem('userId', userId);
}

}
