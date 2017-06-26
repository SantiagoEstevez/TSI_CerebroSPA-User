import { Component, OnInit } from '@angular/core';

//Clases
import { Evento } from './evento';
import { Dispositivo } from './dispositivo';
import { TipoBaseSensor } from '../tipo-sensores/tipo-base-sensor';
import { Ciudad } from '../ciudades/ciudad'

//Servicios.
import { EventosService } from './eventos.service';
import { TipoSensoresService } from '../tipo-sensores/tipo-sensor.service';
import { CiudadesService } from '../ciudades/ciudades.service'

@Component({
    selector: 'eventos-cmp',
    moduleId: module.id,
    templateUrl: 'eventos.component.html'
})

export class EventosComponent implements OnInit {

    constructor(
        private eventosService: EventosService,
        private tipoSensoresService: TipoSensoresService,
        private CiudadesService: CiudadesService
    ) { };

    //Nombres
    nombreCampoCiudad: string = 'Ciudad del evento';
    nombreCampoTS: string = 'Tipo sensor';
    nombreCampoRegla: string = "Regla";
    CampoCiudad: string = this.nombreCampoCiudad;
    CampoTS: string = '';
    CampoRegla: string = '';
    
    //Objetos
    oEvento: Evento;
    oDispositivo: Dispositivo;

    //Listas de objetos
    ciudades: Ciudad[];
    tipoSensores: TipoBaseSensor[];
    eventos: Evento[];
    dispositivos: Dispositivo[];
    reglas: string[] = [">=", "<="];


    ngOnInit() {
        this.inicializo();
    }

    //---> Funciones internas <---
    inicializo() {
        this.CampoCiudad = this.nombreCampoCiudad;

        this.oEvento = new Evento();
        this.eventos = [];
        this.dispositivos = [];
        this.inicializoDispositivo();

        this.getCiudades();
        this.getTipoSensores();   
    }

    inicializoDispositivo() {
        this.CampoTS = this.nombreCampoTS;
        this.CampoRegla = this.nombreCampoRegla;
        this.oDispositivo = new Dispositivo();
    }


    //---> Funciones de eventos <---
    agregarEvento() {
        if (this.oEvento.ciudad != undefined) {
            if (this.dispositivos.length > 0) {
                if (this.oEvento.Nombre != "") {
                    //this.oEvento.SendoresAsociados = this.dispositivos;
                    this.oEvento.SendoresAsociados.push({ ID: 1, Tipo: "Agua", Latitude: 1, Longitude: 1, Umbral: "> 900" });
                    this.setEvento(this.oEvento);

                } else {
                    alert("Debe asignarle un nombre al evento.");
                }
            } else {
                alert("El evento debe tener por lo menos un tipo de sensor asociado.");
            }
        } else {
            alert("Debe seleccionar la ciudad del evento.");
        }
    }

    editarEvento() {
        alert("editando evento");
    }

    eliminarEvento() {
        alert("eliminando evento");
    }

    agregarDispositivo() {
        if (this.oDispositivo.Regla == ">=" || this.oDispositivo.Regla == "<=") {
            if (!isNaN(this.oDispositivo.Medida)) {
                if (this.oDispositivo.Tipo != undefined && this.oDispositivo.Tipo != this.nombreCampoTS) {
                    this.oDispositivo.Umbral = this.oDispositivo.Regla + " " + this.oDispositivo.Medida;
                    this.dispositivos.push(this.oDispositivo);
                    this.inicializoDispositivo();
                } else {
                    alert("Debe seleccionar un tipo de sensor.");
                }
            } else {
                alert("La medida debe ser numerica.");
            }
        } else {
            alert("La regla debe ser >= o <=");
        }
    }

    eliminarDispositivo(dispositivo: Dispositivo) {
        let index: number = this.dispositivos.indexOf(dispositivo);
        if (index !== -1) {
            this.dispositivos.splice(index, 1);
        }  
    }

    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;

        this.oEvento.ciudad = ciudad.Nombre;
        this.oEvento.cLatitude = ciudad.Latitud;
        this.oEvento.cLongitude = ciudad.Longitud;
    }

    changeTipoSensor(tipoSensor: TipoBaseSensor) {
        this.CampoTS = tipoSensor.nombre;
        this.oDispositivo.Tipo = tipoSensor.nombre;
    }

    changeRegla(regla: string) {
        this.CampoRegla = regla;
        this.oDispositivo.Regla = regla;
    }


    //---> Funciones de servicios <---
    getCiudades() {
        this.CiudadesService.getCiudades().then(ciudades => {
            this.ciudades = ciudades;
            this.getEventos();
        });
    }

    getEventos(): void {
        for (var i = 0; i < this.ciudades.length; i++) {
            let nombre = this.ciudades[i].Nombre;

            this.eventosService.getEventos(this.ciudades[i].Latitud, this.ciudades[i].Longitud).then(eventos => {
                if (eventos) {
                    for (var e = 0; e < eventos.length; e++) {
                        if (!eventos[e].SendoresAsociados) {
                            eventos[e].SendoresAsociados = [];
                        }
                        this.eventos.push(eventos[e]);
                    }
                }
            });
        }
    }
    
    getTipoSensores(): void {
        this.tipoSensoresService.getTipoBaseSensor().then(tipoSensores => this.tipoSensores = tipoSensores);
    }

    setEvento(nuevo: Evento): void {
        let latitudgenerada = Math.floor((Math.random() * 10) + 1);
        nuevo.Longitude = latitudgenerada;
        console.log(latitudgenerada)
        this.eventosService.setEvento(nuevo).then(() => {
            this.inicializo();
        });
    }
}
