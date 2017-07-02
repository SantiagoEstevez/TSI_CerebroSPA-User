import { Component, OnInit } from '@angular/core';
import { Evento } from '../eventos/evento';
import { EventosService } from '../eventos/eventos.service';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {

    MisEventos: Evento[];

    constructor(
        private EventosService: EventosService
    ) { }

    ngOnInit() {
        this.EventosService.getEventosByUsername(localStorage.getItem('username'), localStorage.getItem('ciudad')).then(res => {
            this.MisEventos = res;
        });
    }
}
