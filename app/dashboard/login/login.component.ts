import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Usuario } from '../../usuarios/usuario';

declare const FB: any;

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    loading = false;
    error = '';
    user: string;
    password: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        FB.init({
            appId: '1465232330164930',
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.5
        });
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }

    //---> Funciones internas <---
    statusChangeCallback(resp) {
        console.log(resp);
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
        } else if (resp.status === 'not_authorized') {

        } else {

        }
    };

    //---> Funciones de eventos <---
    login() {
        var usuario = new Usuario();
        usuario.CI = "477";
        usuario.Name = "santiago";
        usuario.Lastname = "estevez";
        usuario.Username = this.user;
        usuario.Password = this.password;

        this.loading = true;
        this.authenticationService.login(usuario).subscribe(result => {
            if (result == true) {
                // login successful
                this.router.navigate(['/']);
            } else {
                // login failed
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
    }

    onFacebookLoginClick() {
        FB.login();
    }
}