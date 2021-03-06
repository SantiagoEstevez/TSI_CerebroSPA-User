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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
var ChatService = (function () {
    //private url = 'http://localhost:6346/api/Evento/Global/';
    function ChatService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    ChatService.prototype.getAgrupaciones = function (nombreCiudad) {
        var urlBase = 'http://localhost:6346/api/Chat/AgrupacionesDeCiudad/';
        var url = "" + urlBase + nombreCiudad + "/";
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.getAgrupacionesByUsername = function (nombreCiudad, nombreUsuario) {
        var urlBase = 'http://localhost:6346/api/Chat/AgrupacionesDeUsuario/';
        var url = "" + urlBase + nombreCiudad + "/" + nombreUsuario + "/";
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.getChats = function (nombreCiudad, nombreAgrup) {
        var urlBase = 'http://localhost:6346/api/Chat/ObtenerChat/';
        var url = "" + urlBase + nombreCiudad + "/" + nombreAgrup + "/";
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //setEvento(nurevoEvento: Evento): Promise<Evento> {
    //    return this.http
    //        .post(this.url, JSON.stringify(nurevoEvento), { headers: this.headers })
    //        .toPromise()
    //        .then(res => res.json() as Evento)
    //        .catch(this.handleError);
    //}
    ChatService.prototype.setAgrupaciones = function (agrupacion) {
        var url = 'http://localhost:6346/api/Chat/CrearAgrupacion/';
        return this.http
            .post(url, JSON.stringify(agrupacion), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.setSuscripcion = function (agrupacion) {
        var url = 'http://localhost:6346/api/Chat/SubscribirseAgrupacion/';
        return this.http
            .post(url, JSON.stringify(agrupacion), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.setMensaje = function (mensaje) {
        var url = 'http://localhost:6346/api/Chat/NuevoMensaje/';
        return this.http
            .post(url, JSON.stringify(mensaje), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ChatService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ChatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map