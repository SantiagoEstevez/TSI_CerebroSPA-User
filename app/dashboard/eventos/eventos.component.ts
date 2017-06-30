import { Component, OnInit } from '@angular/core';

//Clases
import { Evento } from './evento';

//Servicios.
import { EventosService } from './eventos.service';

@Component({
    selector: 'eventos-cmp',
    moduleId: module.id,
    templateUrl: 'eventos.component.html'
})

export class EventosComponent implements OnInit {

    constructor(
        private eventosService: EventosService,
    ) { };    

    //Listas de objetos
    eventos: Evento[];


    ngOnInit() {
        this.inicializo();
    }

    //---> Funciones internas <---
    inicializo() {
        this.eventos = [];
        this.getEventos();
    }


    //---> Funciones de eventos <---
    suscribirseEvento(evento: Evento) {
        this.setSuscripcionEvento(evento);
    }


    //---> Funciones de servicios <---
    getEventos() {
        this.eventosService.getEventos().then(eventos => {
            if (eventos) {
                for (let e = 0; e < eventos.length; e++) {
                    if (!eventos[e].SendoresAsociados) {
                        eventos[e].SendoresAsociados = [];
                    }
                    this.eventos.push(eventos[e]);
                }
                console.log(this.eventos);
            }
        });
    }

    setSuscripcionEvento(nuevo: Evento): void {
        alert("suscribiendo a evento");
        //this.eventosService.setEventoZona(nuevo).then(() => {
        //    this.inicializo();
        //});
    }
}
