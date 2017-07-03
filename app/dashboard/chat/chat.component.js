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
    //Polling: IntervalObservable = IntervalObservable.create(1000);
    function ChatComponent(ChatService) {
        this.ChatService = ChatService;
        this.NombreCampoAgupaciones = "Agrupaciones";
        this.oMensaje = new mensaje_1.Mensaje();
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.inicializo();
        if (this.suscripcion) {
            this.suscripcion.unsubscribe();
        }
    };
    //---> Funciones internas <---
    ChatComponent.prototype.inicializo = function () {
        this.chats = [];
        this.CampoAgupaciones = this.NombreCampoAgupaciones;
        this.agrupaciones = [];
        this.getMisAgrupaciones();
        this.inicializoAgrupacion();
        this.inicializoMensaje();
    };
    ChatComponent.prototype.inicializoAgrupacion = function () {
        this.oAgrupacion = new agrupacion_1.Agrupacion();
        this.getAgrupaciones();
    };
    ChatComponent.prototype.inicializoMensaje = function () {
        this.oMensaje = new mensaje_1.Mensaje();
    };
    //---> Funciones de eventos <---
    ChatComponent.prototype.suscribeAgrupacion = function (agrupacion) {
        var _this = this;
        agrupacion.Nombre = localStorage.getItem('username');
        this.ChatService.setSuscripcion(agrupacion).then(function () {
            _this.getMisAgrupaciones();
        });
    };
    ChatComponent.prototype.changeAgrupacion = function (agrupacion) {
        this.CampoAgupaciones = agrupacion.NombreAgrupacion;
        this.initializePolling(agrupacion);
    };
    ChatComponent.prototype.enviarMensaje = function () {
        var _this = this;
        if (this.oMensaje.Contenido != undefined && this.oMensaje.Contenido != "") {
            if (this.CampoAgupaciones != undefined && this.CampoAgupaciones != this.NombreCampoAgupaciones) {
                this.oMensaje.Nombre = localStorage.getItem('username');
                this.oMensaje.NombreAgrupacion = this.CampoAgupaciones;
                this.oMensaje.NombreCiudad = localStorage.getItem('ciudad');
                this.oMensaje.HoraPublicacion = Date.now().toString();
                this.ChatService.setMensaje(this.oMensaje).then(function () {
                    _this.inicializoMensaje();
                });
            }
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
    //---> Funciones de servicios <---
    ChatComponent.prototype.getAgrupaciones = function () {
        var _this = this;
        this.ChatService.getAgrupaciones(localStorage.getItem('ciudad')).subscribe(function (res) {
            _this.agrupaciones = res;
        });
    };
    ChatComponent.prototype.getMisAgrupaciones = function () {
        var _this = this;
        this.ChatService.getAgrupacionesByUsername(localStorage.getItem('ciudad'), localStorage.getItem('username')).subscribe(function (res) {
            _this.MisAgrupaciones = res;
        });
    };
    ChatComponent.prototype.initializePolling = function (agrupacion) {
        var _this = this;
        if (this.suscripcion) {
            this.suscripcion.unsubscribe();
        }
        this.suscripcion = IntervalObservable_1.IntervalObservable.create(1000).subscribe(function (n) {
            _this.ChatService.getChats(localStorage.getItem('ciudad'), agrupacion.NombreAgrupacion).subscribe(function (res) {
                console.log("pidiendo");
                _this.chats = res;
            });
        });
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