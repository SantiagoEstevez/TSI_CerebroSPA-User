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
    chats: string[];

    constructor(
        private ChatService: ChatService
    ) { }

    ngOnInit() {
        this.inicializo();

        //this.ChatService.getAgrupaciones(localStorage.getItem('ciudad')).subscribe(res => {
        //    this.agrupaciones = res;
        //});
    }

    inicializo() {
        this.chats = ['assas', 'dasdasda'];
        this.CampoAgupaciones = this.NombreCampoAgupaciones;
        this.agrupaciones = [];

        this.inicializoAgrupacion();
        this.initializePolling();
    }

    inicializoAgrupacion() {
        this.oAgrupacion = new Agrupacion()
    }

    suscribeAgrupacion(agrupacion: Agrupacion) {
        alert("suscribiendo..");
    }

    changeAgrupacion(agrupacion: Agrupacion) {
        this.CampoAgupaciones = agrupacion.NombreAgrupacion;
        alert("cambiando agrupacion..");
    }

    enviarMensaje() {
        if (this.oMensaje.Contenido != undefined && this.oMensaje.Contenido != "") {
            alert("enviar mensaje..");
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

    initializePolling() {
        this.chats.push("nuevo1");
        IntervalObservable.create(1000).subscribe(n => {
            //return this.chats.push("nuevo");
        });

        //this.chats.push("nuevo1");
        //return Observable.interval(600).flatMap(() => {
            
        //});
    }
}