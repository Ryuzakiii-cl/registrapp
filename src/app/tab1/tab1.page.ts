import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  usuario: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) {}
      

  iniciarSesion() {
    // Obtener los datos de usuarios existentes del localStorage
    const usuariosExistenteString = localStorage.getItem('usuarios');
    const usuariosExistente = usuariosExistenteString ? JSON.parse(usuariosExistenteString) : [];

    // Buscar el usuario por el nombre de usuario
    const usuarioEncontrado = usuariosExistente.find((u: any) => u.usuario === this.usuario);

    if (usuarioEncontrado) {
      // Usuario encontrado, verificar contraseña
      if (usuarioEncontrado.password === this.password) {
        // Contraseña válida, redirigir a la página "Sesión"
        this.navCtrl.navigateForward('/sesion');
      } else {
        // Mostrar un mensaje de alerta si la contraseña es incorrecta
        this.mostrarAlerta('Error', 'Contraseña incorrecta');
      }
    } else {
      // Mostrar un mensaje de alerta si el usuario no existe
      this.mostrarAlerta('Error', 'Ingrese usuario y contraseña');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  




  //Metodos para navegar entre paginas


      Registrar() {
        this.navCtrl.navigateForward('/registrar'); 
          }

      recuperar(){
        this.navCtrl.navigateRoot('/recuperar')
      }

}



