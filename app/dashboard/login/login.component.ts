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
    lat: number;
    lon: number;

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
                    localStorage.setItem('latitud', this.lat.toString());
                    localStorage.setItem('longitud', this.lon.toString());
                    localStorage.setItem('username', this.usuario.Username);
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

            this.usuario.Name = 'facebook'
            this.usuario.Email = 'santiago.estevez.m@gmail.com';
            this.usuario.Username = 'facebook';
            this.usuario.Password = 'facebook'
            this.authenticationService.setUsuario(this.usuario).subscribe(res => {
                localStorage.setItem('username', this.usuario.Username);
                localStorage.setItem('ciudad', this.usuario.Ciudad);
                localStorage.setItem('latitud', this.lat.toString());
                localStorage.setItem('longitud', this.lon.toString());
            });
        }        
    }

    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.usuario.Ciudad = ciudad.Nombre;
        this.lat = ciudad.Latitud;
        this.lon = ciudad.Longitud;
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService.getCiudades().then(ciudades => {
            this.ciudades = ciudades;
        });
    }
}