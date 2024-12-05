import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Correcting styleUrl to styleUrls
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  at = '@';
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private model: any;
  private controls!: OrbitControls;
  buttonPlay=false;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('modelContainer', { static: true }) modelContainer!: ElementRef; // Reference to the model container
  @ViewChild('endTarget') endTarget!: ElementRef;
  @ViewChild('startTarget') startTarget!: ElementRef;
  checkerPosition = 0;
  buttonChecker = true;

  // Define rotation speed for the model
  private modelRotationSpeed = 0.005; // Speed of model rotation

  constructor(private router: Router) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  ngOnInit() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 90;
    this.controls.maxDistance = 90; //0.5
    this.camera.position.z = this.controls.maxDistance;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(3, 3, 3).normalize();
    this.scene.add(directionalLight);
  }

  ngAfterViewInit(): void {
    this.playMusic();
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.modelContainer.nativeElement.appendChild(this.renderer.domElement);
    this.loadModel();
    this.animate(); // Start the animation loop

    const image1 = document.getElementById('kmv');
    const image2 = document.getElementById('kmv2');

    image1?.classList.add('opacity-100');
    image2?.classList.add('hidden');

    setInterval(() => {
      if (image1 && image2) {
        if (image1.classList.contains('opacity-100')) {
          image1.classList.remove('opacity-100');
          image1.classList.add('opacity-0');

          setTimeout(() => {
            image1.classList.add('hidden');
            image2.classList.remove('hidden');
            image2.classList.remove('opacity-0');
            image2.classList.add('opacity-100');
          }, 1000);
        } else {
          image2.classList.remove('opacity-100');
          image2.classList.add('opacity-0');

          setTimeout(() => {
            image2.classList.add('hidden');
            image1.classList.remove('hidden');
            image1.classList.remove('opacity-0');
            image1.classList.add('opacity-100');
          }, 1000);
        }
      }
    }, 5000);

  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    // Rotate the model smoothly along the X-axis
    if (this.model) {
      this.model.rotation.y += this.modelRotationSpeed;
      this.model.rotation.x=0.005; // Smooth rotation
      this.model.rotation.z=0.005;
    }

  }

  // Other methods remain unchanged...
  
  private loadModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      'assets/models/castle.glb',
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.set(1, 1, 1);
        this.model.position.set(0, 0, 0);
        this.scene.add(this.model);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );
  }

  // Remove the onMouseMove method since we are not using it anymore
  // onMouseMove(event: MouseEvent) { ... }

  playMusic() {
    this.buttonPlay=false;
    this.audioPlayer.nativeElement.play().catch(error => {
      console.error("Playback failed:", error);
      this.buttonPlay=true;
    });
  }
  
  stopPlaying() {
    this.audioPlayer.nativeElement.pause(); // Stop the music
    this.audioPlayer.nativeElement.currentTime = 0; 
    this.buttonPlay=true;// Reset to the beginning
  }

  ngOnDestroy(): void {
    if (this.model) {
      this.scene.remove(this.model);
      this.model.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) {
            child.geometry.dispose();
          }
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              if (material instanceof THREE.Material) {
                material.dispose();
              }
            });
          } else if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    const canvas = this.renderer.domElement;
    if (canvas.parentElement) {
      canvas.parentElement.removeChild(canvas);
    }

    if (this.controls) {
      this.controls.dispose();
    }
  }

}