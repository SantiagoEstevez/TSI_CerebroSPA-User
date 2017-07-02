import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CiudadesService } from '../ciudades/ciudades.service';
import { Ciudad } from '../ciudades/ciudad';
import { AuthenticationService } from '../authentication.service';
import { Usuario } from '../../usuarios/usuario';


@Component({
    moduleId: module.id,
    templateUrl: 'registro.component.html'
})

export class RegistroComponent implements OnInit {

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
        this.CampoCiudad = this.nombreCampoCiudad;
        this.usuario = new Usuario;
        this.getCiudades();
    }


    //---> Funciones de eventos <---
    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.usuario.Ciudad = ciudad.Nombre;
    }

    registrar() {
        if (this.usuario.Ciudad != undefined) {
            if (this.usuario.Name != undefined && this.usuario.Name != "") {
                if (this.usuario.Username != undefined && this.usuario.Username != "") {
                    if (this.usuario.Email != undefined && this.usuario.Email != "") {
                        if (this.usuario.Password != undefined && this.usuario.Password != "") {
                            this.authenticationService.setUsuario(this.usuario).subscribe(res => {
                                if (res) {
                                    this.router.navigate(['login']);
                                }
                            });
                        }
                    }
                }
            }
        }
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService.getCiudades().then(ciudades => {
            this.ciudades = ciudades;
        });
    }
}