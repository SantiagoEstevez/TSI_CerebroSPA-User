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
var ciudades_service_1 = require('../ciudades/ciudades.service');
var authentication_service_1 = require('../authentication.service');
var usuario_1 = require('../../usuarios/usuario');
var RegistroComponent = (function () {
    function RegistroComponent(router, authenticationService, ciudadesService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.ciudadesService = ciudadesService;
        this.nombreCampoCiudad = 'Ciudad';
        this.CampoCiudad = '';
    }
    RegistroComponent.prototype.ngOnInit = function () {
        this.CampoCiudad = this.nombreCampoCiudad;
        this.usuario = new usuario_1.Usuario;
        this.getCiudades();
    };
    //---> Funciones de eventos <---
    RegistroComponent.prototype.changeCiudad = function (ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.usuario.Ciudad = ciudad.Nombre;
    };
    RegistroComponent.prototype.registrar = function () {
        var _this = this;
        if (this.usuario.Ciudad != undefined) {
            if (this.usuario.Name != undefined && this.usuario.Name != "") {
                if (this.usuario.Username != undefined && this.usuario.Username != "") {
                    if (this.usuario.Email != undefined && this.usuario.Email != "") {
                        if (this.usuario.Password != undefined && this.usuario.Password != "") {
                            this.authenticationService.setUsuario(this.usuario).subscribe(function (res) {
                                if (res) {
                                    _this.router.navigate(['login']);
                                }
                            });
                        }
                    }
                }
            }
        }
    };
    //---> Funciones de servicios <---
    RegistroComponent.prototype.getCiudades = function () {
        var _this = this;
        this.ciudadesService.getCiudades().then(function (ciudades) {
            _this.ciudades = ciudades;
        });
    };
    RegistroComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'registro.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, ciudades_service_1.CiudadesService])
    ], RegistroComponent);
    return RegistroComponent;
}());
exports.RegistroComponent = RegistroComponent;
//# sourceMappingURL=registro.component.js.map