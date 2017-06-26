import { Component, OnInit } from '@angular/core';
import { Ciudad } from '../ciudades/Ciudad';
import { CiudadesService } from '../ciudades/ciudades.service';
import { TipoSensoresService } from './tipo-sensor.service';
import { TipoSensor } from './tipo-sensor';
import { TipoBaseSensor } from './tipo-base-sensor';
import { SensoresService } from '../sensores/sensores.service';
import { Sensor } from '../sensores/sensor';

@Component({
    selector: 'tipo-sensores-cmp',
    moduleId: module.id,
    templateUrl: 'tipo-sensores.component.html'
})

export class TipoSensoresComponent implements OnInit {

    constructor(
        private ciudadesService: CiudadesService,
        private tipoSensoresService: TipoSensoresService,
        private sensoresService: SensoresService,
        private nuevoTipoSensor: TipoSensor
    ){ }

    nombreCampoTS: string = 'Tipo de sensor';
    nombreCampoCiudad: string = 'Ciudad del sensor';

    Editado: boolean = false;
    CampoTS: string = '';
    CampoCiudad: string = '';
    tipoBaseSensores: TipoBaseSensor[];
    tipoSensores: TipoSensor[];
    ciudades: Ciudad[];

    ngOnInit() {
        this.inicializar();
    }


    //---> Funciones internas <---
    inicializar() {
        this.CampoTS = this.nombreCampoTS;
        this.CampoCiudad = this.nombreCampoCiudad;

        this.nuevoTipoSensor.nombre = '';
        this.nuevoTipoSensor.frecuencia = '';
        this.nuevoTipoSensor.tipo = '';
        this.nuevoTipoSensor.ciudad = '';

        this.getCiudades();
        this.getTipoSensores();
        this.getTipoBaseSensor();

        this.Editado = false;
    }


    //---> Funciones de eventos <---
    changeCiudad(ciudad: Ciudad) {
        this.CampoCiudad = ciudad.Nombre;
        this.nuevoTipoSensor.ciudad = ciudad.Nombre;
    }

    changeTipoBase(tipoBaseSensor: TipoBaseSensor) {
        this.CampoTS = tipoBaseSensor.nombre;
        this.nuevoTipoSensor.tipo = tipoBaseSensor.nombre;
    }

    editarTipoSensor(tiposensor: TipoSensor) {
        this.CampoCiudad = tiposensor.ciudad;
        this.CampoTS = tiposensor.tipo;

        this.nuevoTipoSensor.ciudad = tiposensor.ciudad;
        this.nuevoTipoSensor.tipo = tiposensor.tipo;
        this.nuevoTipoSensor.frecuencia = tiposensor.frecuencia;
        this.nuevoTipoSensor.nombre = tiposensor.nombre;

        this.Editado = true;
    }

    eliminarTipoSensor(tiposensor: TipoSensor) {
        var sensores: Sensor[];
        var existen: boolean = false;

        //this.sensoresService.getSensores().then(s => {
        //    sensores = s;

        //    if (!sensores.find(r => r.Tipo == tiposensor.nombre)) {
        //        this.tipoSensoresService.delete(tiposensor.nombre);
        //    } else {
        //        alert("No se puede eliminar este tipo de sensor ya que tiene sensores asociados a el.");
        //    }
        //});
        
    }

    agregarTipoSensor() {
        var ciudad = this.nuevoTipoSensor.ciudad;
        var tipo = this.nuevoTipoSensor.tipo;
        var nombre = this.nuevoTipoSensor.nombre;
        var frecuencia = this.nuevoTipoSensor.frecuencia;

        if (ciudad != '' && tipo != '' && nombre != '' && frecuencia != '') {
            if (this.Editado) {
                this.updateTipoSensor(this.nuevoTipoSensor);
            } else {
                this.setTipoSensor(this.nuevoTipoSensor);
            }

            this.inicializar();
        }
    }


    //---> Funciones de servicios <---
    getCiudades(): void {
        this.ciudadesService
            .getCiudades()
            .then(ciudades => this.ciudades = ciudades);
    }

    getTipoSensores(): void {
        this.tipoSensoresService
            .getTipoSensores()
            .then(tipoSensores => this.tipoSensores = tipoSensores);
    }

    setTipoSensor(nuevo: TipoSensor): void {
        nuevo.nombre = nuevo.nombre.trim();

        //if (!nombre) { return; }
        this.tipoSensoresService.setTipoSensor(nuevo)
            .then(t => {//this.ciudades.push(ciudad);
            });
    }

    updateTipoSensor(tiposensor: TipoSensor): void {
        this.tipoSensoresService.updateTipoBaseSensor(tiposensor);
    }

    getTipoBaseSensor(): void {
        this.tipoSensoresService
            .getTipoBaseSensor()
            .then(tipoBaseSensores => this.tipoBaseSensores = tipoBaseSensores);
    }
}
