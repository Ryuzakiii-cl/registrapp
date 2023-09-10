import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuario: string = '';
  nuevaPassword: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {
  }

  atrasInicio() {
    this.navCtrl.navigateRoot(['/tabs/tab1']); 
      }


      cambiarPassword() {
        // Obtener los datos de usuarios existentes del localStorage
        const usuariosExistenteString = localStorage.getItem('usuarios');
        const usuariosExistente = usuariosExistenteString ? JSON.parse(usuariosExistenteString) : [];
    
        // Buscar el usuario por el nombre de usuario
        const usuarioEncontrado = usuariosExistente.find((u: any) => u.usuario === this.usuario);
    
        if (usuarioEncontrado) {
          // Usuario encontrado, actualizar la contraseña
          usuarioEncontrado.password = this.nuevaPassword;
    
          // Almacenar los datos actualizados en el localStorage
          localStorage.setItem('usuarios', JSON.stringify(usuariosExistente));
    
          // Mostrar un mensaje de alerta de éxito
          this.mostrarAlerta('Éxito', 'Contraseña cambiada correctamente');
    
          console.log('Todos los datos de usuarios registrados:', usuariosExistente);
          // Limpiar los campos
          this.limpiarCampos();
        } else {
          // Mostrar un mensaje de alerta si el usuario no existe
          this.mostrarAlerta('Error', 'Usuario no se encuentra registrado');
    
          // Limpiar los campos
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
    }


