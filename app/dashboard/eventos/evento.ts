import { Dispositivo } from './dispositivo';

export class Evento {
    ID: number;
    Name: string;
    Nombre: string;
    Latitude: number;
    Longitude: number;
    SendoresAsociados: Dispositivo[];
    Actions: any[];

    //Para la ciudad
    ciudad: string;
    cLatitude: number;
    cLongitude: number;
}