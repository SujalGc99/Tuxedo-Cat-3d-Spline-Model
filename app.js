import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CatModel } from './cat-model.js';

class CatViewer {
    constructor() {
        try {
            console.log('Initializing Cat Viewer...');
            this.canvas = document.getElementById('canvas3d');
            this.loading = document.getElementById('loading');
            this.currentAnimation = 'idle';
            this.autoRotate = true;

            this.init();
            this.setupControls();
            this.animate();
            console.log('Cat Viewer initialized successfully!');
        } catch (error) {
            console.error('Error initializing Cat Viewer:', error);
            if (this.loading) {
                this.loading.innerHTML = '<p style="color:red">Error loading 3D model. Check console.</p>';
            }
        }
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0f); // Dark background matches body CSS
        this.scene.fog = new THREE.Fog(0x0a0a0f, 10, 40);

        // Camera setup
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(3, 2, 5);
        this.camera.lookAt(0, 0.5, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });

        // Full screen sizing
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // Orbit controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 10;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.1; // Restrict going below ground
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.0;

        // Lighting
        this.setupLighting();

        // Simple Ground reflection
        this.createGround();

        // Create cat model
        console.log('Creating cat model...');
        this.catModel = new CatModel();
        this.scene.add(this.catModel.getGroup());
        console.log('Cat model added to scene');

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Hide loading indicator
        setTimeout(() => {
            this.loading.classList.add('hidden');
            console.log('Loading complete');
        }, 800);
    }

    setupLighting() {
        // Ambient light (Dimmer for better contrast)
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(this.ambientLight);

        // Main directional light (Key light) - Brighter and warmer
        this.mainLight = new THREE.DirectionalLight(0xfff0dd, 1.2);
        this.mainLight.position.set(5, 8, 5);
        this.mainLight.castShadow = true;
        this.mainLight.shadow.mapSize.width = 2048;
        this.mainLight.shadow.mapSize.height = 2048;
        this.mainLight.shadow.bias = -0.0001;
        this.scene.add(this.mainLight);

        // Fill light (Cooler)
        const fillLight = new THREE.DirectionalLight(0xcfd5e6, 0.4);
        fillLight.position.set(-5, 3, -5);
        this.scene.add(fillLight);

        // Rim light (Stronger for black fur definition)
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
        rimLight.position.set(0, 4, -5);
        this.scene.add(rimLight);

        // Eye glint
        const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 5);
        pointLight1.position.set(2, 2, 2);
        this.scene.add(pointLight1);
    }

    createGround() {
        // Create a subtle reflective ground
        const groundGeometry = new THREE.CircleGeometry(20, 64);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0f,
            roughness: 0.1,
            metalness: 0.5,
        });

        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Grid helper (very subtle)
        const grid = new THREE.GridHelper(20, 40, 0x1f1f2e, 0x13131f);
        grid.position.y = 0.01;
        this.scene.add(grid);
    }

    setupControls() {
        // Light intensity control
        const lightIntensity = document.getElementById('lightIntensity');
        if (lightIntensity) {
            lightIntensity.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                this.mainLight.intensity = value;
            });
        }

        // Fur color control
        const furColor = document.getElementById('furColor');
        if (furColor) {
            furColor.addEventListener('input', (e) => {
                const color = e.target.value;
                this.catModel.setFurColor(parseInt(color.replace('#', '0x')));
            });
        }

        // Wireframe toggle
        const wireframe = document.getElementById('wireframe');
        if (wireframe) {
            wireframe.addEventListener('change', (e) => {
                this.catModel.toggleWireframe(e.target.checked);
            });
        }

        // Animation control
        const animation = document.getElementById('animation');
        if (animation) {
            animation.addEventListener('change', (e) => {
                this.currentAnimation = e.target.value;
                this.updateAnimation();
            });
        }

        // Auto-rotate control
        const autoRotate = document.getElementById('autoRotate');
        if (autoRotate) {
            autoRotate.addEventListener('change', (e) => {
                this.controls.autoRotate = e.target.checked;
                this.autoRotate = e.target.checked;
            });
        }

        // Reset camera button
        const resetCamera = document.getElementById('resetCamera');
        if (resetCamera) {
            resetCamera.addEventListener('click', () => {
                this.camera.position.set(3, 2, 5);
                this.controls.target.set(0, 0.5, 0);
                this.controls.update();
            });
        }
    }

    updateAnimation() {
        switch (this.currentAnimation) {
            case 'sit':
                this.catModel.animateSit();
                break;
            case 'stand':
                this.catModel.animateStand();
                break;
            case 'idle':
            default:
                this.catModel.animateStand();
                break;
        }
    }

    onWindowResize() {
        // Full screen resize
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = performance.now() * 0.001;

        // Update controls
        this.controls.update();

        // Animate cat if in idle mode
        if (this.currentAnimation === 'idle') {
            this.catModel.animateIdle(time);
        }

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the viewer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        new CatViewer();
    } catch (error) {
        console.error('Failed to create CatViewer:', error);
    }
});
