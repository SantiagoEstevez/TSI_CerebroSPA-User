import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Zona } from '../zonas/zona'

export class MemoriaService implements InMemoryDbService {
    createDb() {
        let ciudad = [{ Nombre: "Monte", Latitud: 1, Longitud: 1}];
        let tiposensores = [];
        let tiposbaseensores = [{ nombre: 'Agua' }, { nombre: 'Fuego' }, { nombre: 'Tierra' }, { nombre: 'Aire' }, { nombre: 'Avatar maestro de los 4 elementos' }];
        let sensores = [];
        let zonas = [
            {
                ID: 1,
                Nombre: Zona,
                Latitude: -34.908739401299641,
                Longitude: -56.1785888671875,
                Radio: 1000,
                ciudad: 'x',
                cLatitude: 1,
                cLongitude: 1
            },
            {
                ID: 2,
                Nombre: Zona,
                Latitude: -34.877059273606314,
                Longitude: -56.286048889160156,
                Radio: 2505.0172620698436,
                ciudad: 'x',
                cLatitude: 1,
                cLongitude: 1
            }
        ];
        let evento = [
            {
                ID: 1,
                Nombre: "Evento chingon"
            },
            {
                ID: 2,
                Nombre: "Evento fuego"
            }
        ];

        return { ciudad, tiposensores, tiposbaseensores, sensores, zonas, evento };
    }
}