import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Router, ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  resultadoEscaneo : string | null = null;
  timestamp1: string;
  timestamp2: string;
  nombre: string | null = null;
  rut: string | null = null;


  constructor( 
    private navCtrl: NavController,
    private router: Router,
    private activatedrouter: ActivatedRoute
    ) { 
      this.activatedrouter.paramMap.subscribe((params) =>{
        this.resultadoEscaneo = params.get('resultadoEscaneo');
      });

    const usuariosExistenteString = localStorage.getItem('usuarios');
    const usuariosExistente = usuariosExistenteString ? JSON.parse(usuariosExistenteString) : [];

    // nombre donde se almacenan los datos
    const usuarioActual = localStorage.getItem('usuarioActual');

    //buscamos el usuario en la lista
    const usuarioEncontrado = usuariosExistente.find((u: any) => u.usuario === usuarioActual);

    if (usuarioEncontrado) {
      // se asigna el nombre y rut segun lo encontrado
      this.nombre = usuarioEncontrado.nombre;
      this.rut = usuarioEncontrado.rut;
    }
      

      const fecha = new Date();
      this.timestamp1 = fecha.toLocaleDateString(); 

      const hora = new Date();
      this.timestamp2 = hora.toLocaleTimeString(); 
    }

  ngOnInit() {
  }


  //Metodos de navegacion
  back(){
    this.router.navigate(['/sesion'])
  }

  cerrarSesion(){
    this.navCtrl.navigateForward('/tabs/tab1')
  }

}
