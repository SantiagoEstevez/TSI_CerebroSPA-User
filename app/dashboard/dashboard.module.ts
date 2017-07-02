import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';

import { Ciudad } from './ciudades/ciudad';
import { TipoSensor } from './tipo-sensores/tipo-sensor';
import { Sensor } from './sensores/sensor';
import { Zona } from './zonas/zona';

import { CiudadesService } from './ciudades/ciudades.service';
import { TipoSensoresService } from './tipo-sensores/tipo-sensor.service';
import { SensoresService } from './sensores/sensores.service';
import { ZonasService } from './zonas/zonas.service';
import { EventosService } from './eventos/eventos.service';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MemoriaService } from './ciudades/memoria.service';

import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';

//para el chat
import {ChannelService, SignalrWindow} from "./chat/services/channel.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(MODULE_ROUTES),
        //InMemoryWebApiModule.forRoot(MemoriaService) //comentar esta linea para desactivar la parte de memoria.
    ],
    declarations: [MODULE_COMPONENTS],
    providers: [CiudadesService,
                TipoSensoresService,
                SensoresService,
                ZonasService,
                EventosService,
                Ciudad,
                TipoSensor,
                Sensor,
                Zona,
                AuthGuard, 
                AuthenticationService,
                ChannelService, 
                { provide: SignalrWindow, useValue: window }
    ]
})

export class DashboardModule{}
