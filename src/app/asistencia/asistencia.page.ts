import { Component, OnInit, inject } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router, ActivatedRoute } from "@angular/router";
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera'; 
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  resultadoEscaneo: string | null = null;
  timestamp1: string;
  timestamp2: string;
  nombre: string | null = null;
  rut: string | null = null;
  coordenadas: string | null = null; // Nueva variable para las coordenadas
  router = inject(Router);
  capturedImage: string | null = null;
  imagens: any[]=[];

  constructor(
    private activatedrouter: ActivatedRoute
  ) {
    this.activatedrouter.paramMap.subscribe((params) => {
      this.resultadoEscaneo = params.get('resultadoEscaneo');
    });

    const usuariosExistenteString = localStorage.getItem('usuarios');
    const usuariosExistente = usuariosExistenteString ? JSON.parse(usuariosExistenteString) : [];

    const usuarioActual = localStorage.getItem('usuarioActual');

    const usuarioEncontrado = usuariosExistente.find((u: any) => u.usuario === usuarioActual);

    if (usuarioEncontrado) {
      this.nombre = usuarioEncontrado.nombre;
      this.rut = usuarioEncontrado.rut;
    }
    const fecha = new Date();
    this.timestamp1 = fecha.toLocaleDateString();

    const hora = new Date();
    this.timestamp2 = hora.toLocaleTimeString();
  }

  ngOnInit() {
    defineCustomElements(window);
    this.obtenerCoordenadas(); // Llama a la función para obtener las coordenadas
  }

  async openFrontCamera() {
    try {
      const photo = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        direction: CameraDirection.Front,
      });
  
      if (photo.webPath) {
        this.capturedImage = photo.webPath; // Almacena la URL de la foto
      } else {
        console.error('La propiedad webPath de la foto es undefined');
      }
    } catch (error) {
      console.error('Error al abrir la cámara frontal: ', error);
    }
  }

  async obtenerCoordenadas() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const latitud = coordinates.coords.latitude;
      const longitud = coordinates.coords.longitude;
      this.coordenadas = `Latitud: ${latitud} , Longitud: ${longitud}`;
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
    }
  }










  back() {
    this.router.navigate(['/sesion']);
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/tabs/tab1']);
  }
}
