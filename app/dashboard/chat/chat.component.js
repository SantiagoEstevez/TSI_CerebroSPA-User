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
var chat_service_1 = require('./chat.service');
var agrupacion_1 = require('./agrupacion');
var mensaje_1 = require('./mensaje');
var IntervalObservable_1 = require('rxjs/observable/IntervalObservable');
var ChatComponent = (function () {
    function ChatComponent(ChatService) {
        this.ChatService = ChatService;
        this.NombreCampoAgupaciones = "Agrupaciones";
        this.oMensaje = new mensaje_1.Mensaje();
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.inicializo();
        //this.ChatService.getAgrupaciones(localStorage.getItem('ciudad')).subscribe(res => {
        //    this.agrupaciones = res;
        //});
    };
    ChatComponent.prototype.inicializo = function () {
        this.chats = ['assas', 'dasdasda'];
        this.CampoAgupaciones = this.NombreCampoAgupaciones;
        this.agrupaciones = [];
        this.inicializoAgrupacion();
        this.initializePolling();
    };
    ChatComponent.prototype.inicializoAgrupacion = function () {
        this.oAgrupacion = new agrupacion_1.Agrupacion();
    };
    ChatComponent.prototype.suscribeAgrupacion = function (agrupacion) {
        alert("suscribiendo..");
    };
    ChatComponent.prototype.changeAgrupacion = function (agrupacion) {
        this.CampoAgupaciones = agrupacion.NombreAgrupacion;
        alert("cambiando agrupacion..");
    };
    ChatComponent.prototype.enviarMensaje = function () {
        if (this.oMensaje.Contenido != undefined && this.oMensaje.Contenido != "") {
            alert("enviar mensaje..");
        }
    };
    ChatComponent.prototype.agregarAgrupacion = function () {
        var _this = this;
        if (this.oAgrupacion.NombreAgrupacion != undefined && this.oAgrupacion.NombreAgrupacion != "") {
            this.oAgrupacion.NombreCiudad = localStorage.getItem('ciudad');
            this.ChatService.setAgrupaciones(this.oAgrupacion).then(function () {
                _this.inicializoAgrupacion();
            });
        }
        else {
            alert("Debe definir nombre agrupacion.");
        }
    };
    ChatComponent.prototype.initializePolling = function () {
        this.chats.push("nuevo1");
        IntervalObservable_1.IntervalObservable.create(1000).subscribe(function (n) {
            //return this.chats.push("nuevo");
        });
        //this.chats.push("nuevo1");
        //return Observable.interval(600).flatMap(() => {
        //});
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'chat-cmp',
            moduleId: module.id,
            templateUrl: 'chat.component.html'
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map