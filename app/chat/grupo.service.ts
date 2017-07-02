import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

export class GrupoT{
    id;
    nombre;
    rol;
    usuario;
}


@Injectable()
export class GrupoService {
    private token = localStorage.getItem('access_token');
    private user = localStorage.getItem('userName');
    private ciudad = localStorage.getItem('ciudad');
    private headers = new Headers({'Content-Type': 'application/json','Authorization' : 'Bearer '+this.token}); 
    private gruposurl= 'http://servicioscerebro.azurewebsites.net/api/Grupo/UserGroups?username=';

    constructor(private http: Http){}


async getGrupos(): Promise<GrupoT[]> {
    let Options = new RequestOptions({ headers : this.headers });
     const response = await this.http.get(this.gruposurl+this.user+"&ciudad="+"Montevideo", Options)
               .toPromise();
               return response.json();
  }




}


