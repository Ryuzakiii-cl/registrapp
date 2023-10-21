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


  constructor(
    public navCtrl: NavController, 
    private alertController: AlertController) {}
      




  iniciarSesion() {
    const usuariosExistenteString = localStorage.getItem('usuarios');
    const usuariosExistente = usuariosExistenteString ? JSON.parse(usuariosExistenteString) : [];

    const usuarioEncontrado = usuariosExistente.find((u: any) => u.usuario === this.usuario);


    if (usuarioEncontrado) {
      if (usuarioEncontrado.password === this.password) {

        localStorage.setItem('usuarioActual', usuarioEncontrado.usuario);
        this.navCtrl.navigateForward(['/sesion', {usuario:this.usuario}]);
        this.usuario = '';
        this.password = '';
      } else {

        this.mostrarAlerta('Error', 'Contraseña incorrecta');
      }
    } else {

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


      Registrar() {
        this.navCtrl.navigateForward('/registrar'); 
        this.usuario = '';
        this.password = '';
          }

      recuperar(){
        this.navCtrl.navigateRoot('/recuperar')
      }

}



