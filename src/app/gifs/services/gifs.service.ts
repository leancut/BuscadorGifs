import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse, } from '../Interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = "IsC84HGqlRYfihpPdPStBTdcokPa5s4K";
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[]=[];
  
  public resultados: Gif[]= [];

get historial (){

  return [...this._historial]
}

constructor(private http: HttpClient){
  this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
  this.resultados=JSON.parse(localStorage.getItem('historialResultado')!) || [];
}

buscarGifs(query: string){


if(!this._historial.includes(query)){
  this._historial.unshift(query);
  this._historial=this._historial.splice(0,10);
  localStorage.setItem('historial', JSON.stringify(this._historial))
}
const params = new HttpParams()
.set('api_key', this.apiKey)
.set('limit', '10')
.set('q', query );

this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } ).subscribe((resp) => {
  this.resultados=resp.data;
  localStorage.setItem('historialResultado', JSON.stringify(this.resultados))
})
}

}
