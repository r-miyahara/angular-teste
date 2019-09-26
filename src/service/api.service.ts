import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from 'src/model/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://api.github.com/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(apiUrl)
      .pipe(
        tap(users => console.log('leu os users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`leu o user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser (user): Observable<User> {
    return this.http.post<User>(apiUrl, user, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((user: User) => console.log(`adicionou o user com w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(id, user): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`atualiza o usuario com id=`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser (id): Observable<User> {
    const url = `${apiUrl}/delete/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o user com id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
