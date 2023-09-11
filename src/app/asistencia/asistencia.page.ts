import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor( 
    private navCtrl: NavController,
    private router: Router
    ) { }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['/sesion'])
  }


  cerrarSesion(){
    this.navCtrl.navigateForward('/tabs/tab1')
  }

}
