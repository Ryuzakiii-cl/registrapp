import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios.service';

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
  rut: string = '';
  usuario: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private ServiciosService: ServiciosService
  ) {}

  ngOnInit() {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.ServiciosService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }

  async crearCuenta() {
    // Validación de campos aquí si es necesario
    if (
      this.nombre == '' ||
      this.apellido == '' ||
      this.rut == '' ||
      this.usuario == '' ||
      this.password == ''
    ) {
      console.error('Campos vacios');
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
        rut: this.rut,
        usuario: this.usuario,
        password: this.password,
      };

      usuariosExistente.push(nuevoUsuario);

      localStorage.setItem('usuarios', JSON.stringify(usuariosExistente));
      // Mostrar todos los datos de usuarios en la consola
      console.log(
        'Todos los datos de usuarios registrados:',
        usuariosExistente
      );
      this.limpiarCampos();

      const alert = await this.alertController.create({
        header: 'Exito',
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
  }

  atrasInicio() {
    this.navCtrl.navigateRoot(['/tabs/tab1']);
  }
}
