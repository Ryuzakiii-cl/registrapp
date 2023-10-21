import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string = '';
  nuevaPassword: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  cambiarPassword() {
    const usuariosExistenteString = localStorage.getItem('usuarios');
    const usuariosExistente = usuariosExistenteString
      ? JSON.parse(usuariosExistenteString)
      : [];

    const usuarioEncontrado = usuariosExistente.find(
      (u: any) => u.usuario === this.usuario
    );

    if (usuarioEncontrado) {
      usuarioEncontrado.password = this.nuevaPassword;

      localStorage.setItem('usuarios', JSON.stringify(usuariosExistente));

      this.mostrarAlerta('Éxito', 'Contraseña cambiada correctamente');

      console.log(
        'Todos los datos de usuarios registrados:',
        usuariosExistente
      );
      this.limpiarCampos();
    } else {
      this.mostrarAlerta('Error', 'Usuario no se encuentra registrado');
      this.limpiarCampos();
    }
  } 

  limpiarCampos() {
    this.usuario = '';
    this.nuevaPassword = '';
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  back() {
    this.router.navigate(['/tabs/tab1']);
  }
}
