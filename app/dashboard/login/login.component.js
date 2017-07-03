"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var authentication_service_1 = require('../authentication.service');
var usuario_1 = require('../../usuarios/usuario');
var ciudades_service_1 = require('../ciudades/ciudades.service');
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, ciudadesService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.ciudadesService = ciudadesService;
        this.loading = false;
        this.error = '';
        this.nombreCampoCiudad = 'Ciudad';
        this.CampoCiudad = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        //this.authenticationService.logout();
        this.authenticationService.statusFB();
        this.usuario = new usuario_1.Usuario;
        this.CampoCiudad = this.nombreCampoCiudad;
        this.getCiudades();
    };
    //---> Funciones de eventos <---
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.usuario.Ciudad != undefined && this.usuario.Ciudad != "") {
            this.loading = true;
            this.authenticationService.login(this.usuario).subscribe(function (result) {
                if (result == true) {
                    // login successful
                    localStorage.setItem('ciudad', _this.usuario.Ciudad);
                    localStorage.setItem('latitud', _this.lat.toString());
                    localStorage.setItem('longitud', _this.lon.toString());
                    localStorage.setItem('username', _this.usuario.Username);
                    _this.router.navigate(['/']);
                }
                else {
                    // login failed
                    _this.error = 'Username or password is incorrect';
                    _this.loading = false;
                }
            });
        }
    };
    LoginComponent.prototype.loginFB = function () {
        if (this.usuario.Ciudad != undefined && this.usuario.Ciudad != "") {
            this.authenticationService.loginFB();
            localStorage.setItem('ciudad', this.usuario.Ciudad);
            localStorage.setItem('latitud', this.lat.toString());
            localStorage.setItem('longitud', this.lon.toString());
            localStorage.setItem('username', this.usuario.Username);
        }
    };
    LoginComponent.prototype.changeCiudad = function (ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.usuario.Ciudad = ciudad.Nombre;
        this.lat = ciudad.Latitud;
        this.lon = ciudad.Longitud;
    };
    //---> Funciones de servicios <---
    LoginComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService.getCiudades().then(function (ciudades) {
            _this.ciudades = ciudades;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ciudades_service_1.CiudadesService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map