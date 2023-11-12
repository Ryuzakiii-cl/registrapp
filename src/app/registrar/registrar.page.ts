import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar',
  templateUrl: 'registrar.page.html',
  styleUrls: ['registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  regiones: any[] = [];
  comunas: any[] = [];
  nombre: string = '';
  apellido: string = '';
  regionSeleccionada: number | null = null;
  comunaSeleccionada: number | null = null;
  rut: string = '';
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private ServiciosService: ServiciosService
  ) {}

  ngOnInit() {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.ServiciosService.obtenerRegiones().subscribe(
      (data: any) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }

  onRegionChange() {

    if (this.regionSeleccionada) {
      console.log('ID de la región seleccionada:', this.regionSeleccionada);
      this.ServiciosService.obtenerComunas(this.regionSeleccionada).subscribe(
        (data: any) => {
          this.comunas = data.data;
        },
        (error) => {
          console.error('Error al obtener las comunas: ', error);
        }
      );
    }
  }

  async crearCuenta() {
    if (
      this.nombre == '' ||
      this.apellido == '' ||
      this.rut == '' ||
      this.usuario == '' ||
      this.password == '' ||
      this.regionSeleccionada == null ||
      this.comunaSeleccionada == null
    ) {
      console.error('Campos vacíos');
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Todos los campos deben llenarse',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const usuariosExistenteString = localStorage.getItem('usuarios');
      const usuariosExistente = usuariosExistenteString
        ? JSON.parse(usuariosExistenteString)
        : [];

      const nuevoUsuario = {
        nombre: this.nombre,
        apellido: this.apellido,
        region: this.regionSeleccionada,
        comuna: this.comunaSeleccionada,
        rut: this.rut,
        usuario: this.usuario,
        password: this.password,
      };

      usuariosExistente.push(nuevoUsuario);

      localStorage.setItem('usuarios', JSON.stringify(usuariosExistente));
      console.log('Todos los datos de usuarios registrados:', usuariosExistente);
      this.limpiarCampos();

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'La cuenta ha sido creada exitosamente',
        buttons: ['Aceptar'],
      });

      await alert.present();
    }
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.rut = '';
    this.usuario = '';
    this.password = '';
    this.regionSeleccionada = null;
    this.comunaSeleccionada = null;
  }

  back() {
    this.router.navigate(['/tabs/tab1']);
  }
}
