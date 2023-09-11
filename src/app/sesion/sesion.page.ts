import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { BarcodeScanner} from 'capacitor-barcode-scanner'
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.page.html',
  styleUrls: ['./sesion.page.scss'],
})
export class SesionPage implements OnInit {
  usuario: string | null = null;
  isSupported = true;
 

  constructor(private alertController: AlertController,
    private  navCtrl: NavController,
    private activatedrouter: ActivatedRoute) { 
      this.activatedrouter.paramMap.subscribe((params) =>{
        this.usuario = params.get('usuario');
      });
    }

  ngOnInit() {
    
  }


  async anto(){
    const resultadoScan = await(await BarcodeScanner.scan())
      
    if (resultadoScan.result) {
      console.log("resulatdo escaner",resultadoScan.code);
    }
    else
    {
      alert("No es posible capturar la información.")
    }
  }

  
 

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  CerrarSesion() {
    this.navCtrl.navigateRoot(['/tabs/tab1']); 
      }
}
