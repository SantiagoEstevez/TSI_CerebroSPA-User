import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat';
import { Agrupacion } from './agrupacion';
import { Mensaje } from './mensaje';
import { Observable } from 'rxjs/Rx';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
    selector: 'chat-cmp',
    moduleId: module.id,
    templateUrl: 'chat.component.html'
})

export class ChatComponent implements OnInit {

    NombreCampoAgupaciones: string = "Agrupaciones";
    CampoAgupaciones: string;

    oMensaje: Mensaje = new Mensaje();
    oAgrupacion: Agrupacion;
    agrupaciones: Agrupacion[];
    MisAgrupaciones: Agrupacion[];
    chats: Chat[];
    suscripcion: any;
    //Polling: IntervalObservable = IntervalObservable.create(1000);

    constructor(
        private ChatService: ChatService,
    ) { }

    ngOnInit() {
        this.inicializo();

        if (this.suscripcion) {
            this.suscripcion.unsubscribe();
        }
    }

    //---> Funciones internas <---
    inicializo() {
        this.chats = [];
        this.CampoAgupaciones = this.NombreCampoAgupaciones;
        this.agrupaciones = [];

        this.getMisAgrupaciones();
        this.inicializoAgrupacion();
        this.inicializoMensaje();
    }

    inicializoAgrupacion() {
        this.oAgrupacion = new Agrupacion()
        this.getAgrupaciones();
    }

    inicializoMensaje() {
        this.oMensaje = new Mensaje()
    }


    //---> Funciones de eventos <---
    suscribeAgrupacion(agrupacion: Agrupacion) {
        agrupacion.Nombre = localStorage.getItem('username');

        this.ChatService.setSuscripcion(agrupacion).then(() => {
            this.getMisAgrupaciones();
        });
    }

    changeAgrupacion(agrupacion: Agrupacion) {
        this.CampoAgupaciones = agrupacion.NombreAgrupacion;
        this.initializePolling(agrupacion);
    }

    enviarMensaje() {
        if (this.oMensaje.Contenido != undefined && this.oMensaje.Contenido != "") {
            if (this.CampoAgupaciones != undefined && this.CampoAgupaciones != this.NombreCampoAgupaciones) {
                this.oMensaje.Nombre = localStorage.getItem('username');
                this.oMensaje.NombreAgrupacion = this.CampoAgupaciones;
                this.oMensaje.NombreCiudad = localStorage.getItem('ciudad');
                this.oMensaje.HoraPublicacion = Date.now().toString();

                this.ChatService.setMensaje(this.oMensaje).then(() => {
                    this.inicializoMensaje();
                });
            }
        }
    }

    agregarAgrupacion() {
        if (this.oAgrupacion.NombreAgrupacion != undefined && this.oAgrupacion.NombreAgrupacion != "") {
                this.oAgrupacion.NombreCiudad = localStorage.getItem('ciudad');
                this.ChatService.setAgrupaciones(this.oAgrupacion).then(() => {
                this.inicializoAgrupacion();
            });
        } else {
            alert("Debe definir nombre agrupacion.");
        }
    }

    //---> Funciones de servicios <---
    getAgrupaciones() {
        this.ChatService.getAgrupaciones(localStorage.getItem('ciudad')).subscribe(res => {
            this.agrupaciones = res;
        });
    }

    getMisAgrupaciones() {
        this.ChatService.getAgrupacionesByUsername(localStorage.getItem('ciudad'), localStorage.getItem('username')).subscribe(res => {
            this.MisAgrupaciones = res;
        });
    }

    initializePolling(agrupacion: Agrupacion) {
        if (this.suscripcion) {
            this.suscripcion.unsubscribe();
        }

        this.suscripcion = IntervalObservable.create(1000).subscribe(n => {
            this.ChatService.getChats(localStorage.getItem('ciudad'), agrupacion.NombreAgrupacion).subscribe(res => {
                console.log("pidiendo");
                this.chats = res;
            });
        });
    }
}