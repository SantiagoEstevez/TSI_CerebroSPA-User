import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { Usuario } from '../usuarios/usuario'

@Injectable()
export class AuthenticationService {
    public token: string;
    private url = 'http://localhost:6346/api/usuario/login';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.token = currentUser && currentUser.token;
    }

    //login(usuario: Usuario): Observable<boolean> {
    //    return this.http.post(this.url, JSON.stringify(usuario))
    //        .map((response: Response) => {
    //            // login successful if there's a jwt token in the response
    //            console.log("antes de tocar");
    //            let token = response.json() && response.json().token;
    //            if (token) {
    //                // set token property
    //                this.token = token;

    //                // store username and jwt token in local storage to keep user logged in between page refreshes
    //                localStorage.setItem('currentUser', JSON.stringify(usuario));

    //                // return true to indicate successful login
    //                return true;
    //            } else {
    //                // return false to indicate failed login
    //                return false;
    //            }
    //        });
    //}

    //login2(usuario: Usuario): Observable<string> {
    //    console.log("entre");
    //    return this.http
    //        .post(this.url, JSON.stringify(Usuario), { headers: this.headers })
    //        .map(res => {
    //            console.log("emm se supone que me deberia estar llegando.");
    //            console.log(res.json());
    //        })
    //        .catch(this.handleError);
    //}

    login(usuario: Usuario): Observable<boolean> {
        return this.http
            .post(this.url, JSON.stringify(usuario), { headers: this.headers })
            .map(response => {
                localStorage.setItem('token', response.json() as string);
                return true;
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('token');
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
