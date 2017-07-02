import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Usuario } from '../../usuarios/usuario';
import { CiudadesService } from '../ciudades/ciudades.service';
import { Ciudad } from '../ciudades/ciudad';

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

    nombreCampoCiudad: string = 'Ciudad';
    CampoCiudad: string = '';
    ciudades: Ciudad[];
    usuario: Usuario;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private ciudadesService: CiudadesService
    ) {
    }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
        this.authenticationService.statusFB();

        this.usuario = new Usuario;
        this.CampoCiudad = this.nombreCampoCiudad;
        this.getCiudades();
    }


    //---> Funciones de eventos <---
    login() {
        if (this.usuario.Ciudad != undefined && this.usuario.Ciudad != "") {

            this.loading = true;
            this.authenticationService.login(this.usuario).subscribe(result => {
                if (result == true) {
                    // login successful
                    localStorage.setItem('ciudad', this.usuario.Ciudad);
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
        }
    }

    loginFB() {
        if (this.usuario.Ciudad != undefined && this.usuario.Ciudad != "") {
            this.authenticationService.loginFB();
            localStorage.setItem('ciudad', this.usuario.Ciudad);
        }        
    }

    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.usuario.Ciudad = ciudad.Nombre;
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService.getCiudades().then(ciudades => {
            this.ciudades = ciudades;
        });
    }
}