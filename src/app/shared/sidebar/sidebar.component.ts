import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  GifsService: any;

get historial(){
return this.gifsService.historial; 
}

  constructor(private gifsService:GifsService) { }

  buscar (termino : string){
    console.log(termino);
    this.gifsService.buscarGifs(termino);
  }

}
