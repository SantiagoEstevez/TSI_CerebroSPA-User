import { Component, OnInit } from '@angular/core';

//Clases
import { Evento } from './evento';
import { Zona } from '../zonas/zona'
import { Suscripcion } from './suscripcion'

//Servicios.
import { EventosService } from './eventos.service';
import { ZonasService } from '../zonas/zonas.service'
import { SensoresService } from '../sensores/sensores.service';

declare var google: any;

@Component({
    selector: 'eventosZonas-cmp',
    moduleId: module.id,
    templateUrl: 'eventosZonas.component.html'
})

export class EventosZonasComponent implements OnInit {

    constructor(
        private eventosService: EventosService,
        private ZonasService: ZonasService,
        private SensoresService: SensoresService
    ) { };
    
    //Objetos
    map: any;

    //Listas de objetos
    eventos: Evento[];
    zonas: Zona[];
    zonasMapa: any[];
    sensoresMapa: any[];


    ngOnInit() {
        //Cargo mapa
        var myLatlng = new google.maps.LatLng(localStorage.getItem('latitud'), localStorage.getItem('longitud'));
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: true, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: []
        }
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        this.inicializo();
    }

    //---> Funciones internas <---
    inicializo() {
        this.eventos = [];
        this.zonas = [];
        this.zonasMapa = [];
        this.sensoresMapa = [];

        this.getZonas();
        this.getSensores();
    }

    borrarZonasMapa() {
        for (let i = 0; i < this.zonasMapa.length; i++) {
            this.zonasMapa[i].setMap(null);
        }
        this.zonasMapa = [];
    }

    borrarSensoresMapa() {
        for (let i = 0; i < this.sensoresMapa.length; i++) {
            this.sensoresMapa[i].setMap(null);
        }
        this.sensoresMapa = [];
    }


    //---> Funciones de eventos <---
    suscribirseEvento(evento: Evento) {
        this.setSuscripcionEvento(evento);
    }


    //---> Funciones de servicios <---
    getEventos(lat: number, lon: number) {
        this.eventos = [];

        let zona: Zona = this.zonas.find(z => z.Latitude == lat && z.Longitude == lon);
        if (zona) {
            this.eventosService.getEventosZonaByCityZone(localStorage.getItem('ciudad'), zona.ID).then(eventos => {
                console.log("1");
                console.log(eventos);
                if (eventos) {
                    console.log("asdads");
                    console.log(eventos);
                    for (let e = 0; e < eventos.length; e++) {
                        if (!eventos[e].SendoresAsociados) {
                            eventos[e].SendoresAsociados = [];
                        }
                        this.eventos.push(eventos[e]);
                    }
                }
            });
        } 
    }

    setSuscripcionEvento(nuevo: Evento): void {
        let sus: Suscripcion = new Suscripcion();
        sus.IDEvento = nuevo.ID;
        sus.Username = localStorage.getItem('username');
        sus.NombreCiudad = localStorage.getItem('ciudad');

        this.eventosService.setSuscribeEvento(sus).then(() => {
            this.inicializo();
        });
    }


    getSensores(): void {
        this.borrarSensoresMapa();

        this.SensoresService.getSensoresByCityName(localStorage.getItem('ciudad')).subscribe(sensores => {
            for (var i = 0; i < sensores.length; i++) {
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(sensores[i].Latitude, sensores[i].Longitude),
                    title: sensores[i].Tipo,
                    map: this.map
                });

                this.sensoresMapa.push(marker);
            }
        });
    }

    getZonas() {
        this.borrarZonasMapa();

        this.ZonasService.getZonasByCityName(localStorage.getItem('ciudad')).then(zonas => {
            if (zonas) {
                this.zonas = zonas;

                for (let z = 0; z < zonas.length; z++) {
                    let zona = new google.maps.Circle({
                        radius: zonas[z].Radio,
                        center: new google.maps.LatLng(zonas[z].Latitude, zonas[z].Longitude),
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        clickable: true,
                        editable: false,
                        map: this.map
                    });

                    //Eventos seleccion de la zona mapa.
                    zona.addListener('click', (e) => {
                        for (let c = 0; c < this.zonasMapa.length; c++) {
                            this.zonasMapa[c].setOptions({ fillColor: '#FF0000', strokeColor: '#FF0000' });
                        }
                        zona.setOptions({ fillColor: '#013ADF', strokeColor: '#08088A' });
                        this.getEventos(zona.getCenter().lat(), zona.getCenter().lng());
                    });

                    this.zonasMapa.push(zona);
                }
            }
        });
    }
}
