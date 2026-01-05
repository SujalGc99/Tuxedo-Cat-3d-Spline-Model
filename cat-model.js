import * as THREE from 'three';

/**
 * CatModel - Creates an ultrarealistic stylized 3D cat (Tuxedo style)
 * Uses Catmull-Rom splines for smooth, organic shapes
 */
export class CatModel {
    constructor() {
        this.group = new THREE.Group();
        this.materials = this.createMaterials();
        this.buildCat();
    }

    createMaterials() {
        // Black Fur material (Velvet look)
        const blackFurMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a, // Soft black
            roughness: 0.6,
            metalness: 0.1,
            normalScale: new THREE.Vector2(0.5, 0.5),
        });

        // White Fur material (Chest, Paws, Muzzle)
        const whiteFurMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.6,
            metalness: 0.1,
            normalScale: new THREE.Vector2(0.5, 0.5),
        });

        // Eye material (Glowing Yellow/Gold)
        const eyeMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold
            roughness: 0.2, // Shiny
            metalness: 0.0,
            emissive: 0xffaa00,
            emissiveIntensity: 0.2,
        });

        // Nose material (Pink)
        const noseMaterial = new THREE.MeshStandardMaterial({
            color: 0xffb6c1,
            roughness: 0.4,
            metalness: 0.1,
        });

        // Inner ear material
        const innerEarMaterial = new THREE.MeshStandardMaterial({
            color: 0xffb6c1,
            roughness: 0.6,
            metalness: 0.0,
        });

        // Whiskers material
        const whiskerMaterial = new THREE.LineBasicMaterial({
            color: 0xdddddd,
            opacity: 0.6,
            transparent: true,
        });

        return { blackFurMaterial, whiteFurMaterial, eyeMaterial, noseMaterial, innerEarMaterial, whiskerMaterial };
    }

    /**
     * Creates a smooth tube geometry from a spline curve
     */
    createSplineTube(points, radius, radialSegments = 16, tubularSegments = 64) {
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(
            curve,
            tubularSegments,
            radius,
            radialSegments,
            false
        );
        return geometry;
    }

    buildCat() {
        this.createBody();
        this.createHead();
        this.createEars();
        this.createLegs();
        this.createTail();
        this.createEyes();
        this.createNose();
        this.createWhiskers();
        this.addFurDetails();
    }

    createBody() {
        // Main Body (Black)
        const bodyGeometry = new THREE.SphereGeometry(0.55, 32, 32); // Slightly chunkier
        const body = new THREE.Mesh(bodyGeometry, this.materials.blackFurMaterial);

        // Scale to create cat body proportions (Chunky sitting feel)
        body.scale.set(0.85, 0.8, 1.3);
        body.position.set(0, 0.6, 0.1); // Shifted slightly back
        body.castShadow = true;
        body.receiveShadow = true;

        this.group.add(body);
        this.body = body;

        // White Chest Patch
        const chestGeometry = new THREE.SphereGeometry(0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const chest = new THREE.Mesh(chestGeometry, this.materials.whiteFurMaterial);
        chest.scale.set(0.7, 0.8, 0.5);
        chest.position.set(0, 0.5, 0.55); // Positioned on front of chest
        chest.rotation.x = -Math.PI / 4;
        chest.castShadow = true;
        chest.receiveShadow = true;
        this.group.add(chest);
    }

    createHead() {
        // Head (Black) - Rounder
        const headGeometry = new THREE.SphereGeometry(0.38, 32, 32);
        const head = new THREE.Mesh(headGeometry, this.materials.blackFurMaterial);

        head.scale.set(1, 0.9, 0.9);
        head.position.set(0, 0.95, 1.2); // Raised slightly
        head.castShadow = true;
        head.receiveShadow = true;

        this.group.add(head);
        this.head = head;

        // Muzzle/Snout (White)
        const snoutGeometry = new THREE.SphereGeometry(0.16, 24, 24); // Slightly larger muzzle
        const snout = new THREE.Mesh(snoutGeometry, this.materials.whiteFurMaterial); // White muzzle
        snout.scale.set(1.1, 0.8, 1.0); // Wider muzzle
        snout.position.set(0, 0.82, 1.48);
        snout.castShadow = true;
        snout.receiveShadow = true;
        this.group.add(snout);

        // White blaze on forehead (Optional geometric detail for tuxedo look)
        const blazeGeometry = new THREE.ConeGeometry(0.08, 0.3, 16);
        const blaze = new THREE.Mesh(blazeGeometry, this.materials.whiteFurMaterial);
        blaze.position.set(0, 1.1, 1.45);
        blaze.rotation.x = -0.5;
        blaze.scale.set(1, 1, 0.5);
        blaze.receiveShadow = true;
        this.group.add(blaze);
    }

    createEars() {
        // Left ear (Black outer)
        const leftEarGeometry = new THREE.ConeGeometry(0.12, 0.3, 16); // Wider base
        const leftEar = new THREE.Mesh(leftEarGeometry, this.materials.blackFurMaterial);
        leftEar.position.set(-0.25, 1.25, 1.15);
        leftEar.rotation.z = -0.4;
        leftEar.rotation.x = 0.2;
        leftEar.castShadow = true;
        leftEar.receiveShadow = true;
        this.group.add(leftEar);

        // Inner ear detail (Pink)
        const innerEarGeometry = new THREE.ConeGeometry(0.06, 0.2, 16);
        const leftInnerEar = new THREE.Mesh(innerEarGeometry, this.materials.innerEarMaterial);
        leftInnerEar.position.set(-0.25, 1.25, 1.22);
        leftInnerEar.rotation.z = -0.4;
        leftInnerEar.rotation.x = 0.2;
        leftInnerEar.castShadow = true;
        this.group.add(leftInnerEar);

        // Right ear (mirror)
        const rightEar = leftEar.clone();
        rightEar.position.set(0.25, 1.25, 1.15);
        rightEar.rotation.z = 0.4;
        rightEar.castShadow = true;
        rightEar.receiveShadow = true;
        this.group.add(rightEar);

        const rightInnerEar = leftInnerEar.clone();
        rightInnerEar.position.set(0.25, 1.25, 1.22);
        rightInnerEar.rotation.z = 0.4;
        rightInnerEar.castShadow = true;
        this.group.add(rightInnerEar);
    }

    createLegs() {
        // Legs (Black tubes)
        const legPointsFront = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, -0.25, 0.05),
            new THREE.Vector3(0, -0.45, 0),
        ];

        const legGeometryFront = this.createSplineTube(legPointsFront, 0.09, 12, 32); // Thicker legs

        // Front Left
        const frontLeftLeg = new THREE.Mesh(legGeometryFront, this.materials.blackFurMaterial);
        frontLeftLeg.position.set(-0.35, 0.55, 0.8);
        frontLeftLeg.castShadow = true;
        frontLeftLeg.receiveShadow = true;
        this.group.add(frontLeftLeg);

        // Front Right
        const frontRightLeg = frontLeftLeg.clone();
        frontRightLeg.position.set(0.35, 0.55, 0.8);
        frontRightLeg.castShadow = true;
        frontRightLeg.receiveShadow = true;
        this.group.add(frontRightLeg);

        // Back Legs (Slightly different shape for sitting)
        const legPointsBack = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, -0.2, -0.1),
            new THREE.Vector3(0, -0.4, 0),
        ];
        const legGeometryBack = this.createSplineTube(legPointsBack, 0.11, 12, 32); // Thicker haunches

        // Back Left
        const backLeftLeg = new THREE.Mesh(legGeometryBack, this.materials.blackFurMaterial);
        backLeftLeg.position.set(-0.4, 0.45, -0.4);
        backLeftLeg.rotation.x = -0.3;
        backLeftLeg.castShadow = true;
        backLeftLeg.receiveShadow = true;
        this.group.add(backLeftLeg);

        // Back Right
        const backRightLeg = backLeftLeg.clone();
        backRightLeg.position.set(0.4, 0.45, -0.4);
        backRightLeg.castShadow = true;
        backRightLeg.receiveShadow = true;
        this.group.add(backRightLeg);

        // Add Paws (White Socks)
        this.createPaws();
    }

    createPaws() {
        const pawGeometry = new THREE.SphereGeometry(0.12, 16, 16); // Larger paws
        pawGeometry.scale(1, 0.7, 1.2);

        const positions = [
            { x: -0.35, y: 0.05, z: 0.8 },  // Front left
            { x: 0.35, y: 0.05, z: 0.8 },   // Front right
            { x: -0.4, y: 0.05, z: -0.3 }, // Back left
            { x: 0.4, y: 0.05, z: -0.3 },  // Back right
        ];

        positions.forEach(pos => {
            const paw = new THREE.Mesh(pawGeometry, this.materials.whiteFurMaterial); // White socks
            paw.position.set(pos.x, pos.y, pos.z);
            paw.castShadow = true;
            paw.receiveShadow = true;
            this.group.add(paw);
        });
    }

    createTail() {
        // Fluffier Tail (Black)
        const tailPoints = [
            new THREE.Vector3(0, 0.5, -1.1),
            new THREE.Vector3(0, 0.7, -1.6),
            new THREE.Vector3(0.2, 1.1, -1.9),
            new THREE.Vector3(0.4, 1.5, -2.0),
        ];

        const tailGeometry = this.createSplineTube(tailPoints, 0.12, 12, 64); // Thicker tail
        const tail = new THREE.Mesh(tailGeometry, this.materials.blackFurMaterial);
        tail.castShadow = true;
        tail.receiveShadow = true;
        this.group.add(tail);
        this.tail = tail;

        // White tip (Optional)
        const tipGeometry = new THREE.SphereGeometry(0.11, 16, 16);
        const tip = new THREE.Mesh(tipGeometry, this.materials.whiteFurMaterial);
        tip.position.set(0.4, 1.5, -2.0);
        tip.castShadow = true;
        this.group.add(tip);
    }

    createEyes() {
        // Eyes (Yellow/Gold)
        const eyeGeometry = new THREE.SphereGeometry(0.09, 24, 24); // Larger eyes
        const leftEye = new THREE.Mesh(eyeGeometry, this.materials.eyeMaterial);
        leftEye.position.set(-0.16, 0.95, 1.48);
        leftEye.rotation.y = 0.2;
        leftEye.castShadow = true;
        this.group.add(leftEye);

        // Pupil (Large, cute)
        const pupilGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0 });
        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(-0.16, 0.95, 1.56);
        leftPupil.scale.set(0.8, 1.2, 0.5); // Vertical slit/oval
        this.group.add(leftPupil);

        // Right eye
        const rightEye = leftEye.clone();
        rightEye.position.set(0.16, 0.95, 1.48);
        rightEye.rotation.y = -0.2;
        rightEye.castShadow = true;
        this.group.add(rightEye);

        const rightPupil = leftPupil.clone();
        rightPupil.position.set(0.16, 0.95, 1.56);
        this.group.add(rightPupil);
    }

    createNose() {
        const noseGeometry = new THREE.SphereGeometry(0.04, 16, 16); // Smaller, cute nose
        const nose = new THREE.Mesh(noseGeometry, this.materials.noseMaterial);
        nose.scale.set(1, 0.8, 0.5);
        nose.position.set(0, 0.88, 1.63);
        nose.castShadow = true;
        this.group.add(nose);
    }

    createWhiskers() {
        // Create whiskers using lines
        const whiskerCount = 6;
        const whiskerLength = 0.35;

        const geometry = new THREE.BufferGeometry();
        const positions = [];

        // Left side whiskers
        for (let i = 0; i < whiskerCount; i++) {
            const yOffset = (i - whiskerCount / 2) * 0.02;
            const angle = 0.2 + (i * 0.1);

            // Start point (near nose)
            positions.push(-0.1, 0.85 + yOffset, 1.55);
            // End point (outwards)
            positions.push(
                -0.1 - Math.cos(angle) * whiskerLength,
                0.85 + yOffset + Math.sin(angle) * 0.1,
                1.55 + Math.sin(angle) * 0.1
            );
        }

        // Right side whiskers
        for (let i = 0; i < whiskerCount; i++) {
            const yOffset = (i - whiskerCount / 2) * 0.02;
            const angle = 0.2 + (i * 0.1);

            positions.push(0.1, 0.85 + yOffset, 1.55);
            positions.push(
                0.1 + Math.cos(angle) * whiskerLength,
                0.85 + yOffset + Math.sin(angle) * 0.1,
                1.55 + Math.sin(angle) * 0.1
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const whiskers = new THREE.LineSegments(geometry, this.materials.whiskerMaterial);
        this.group.add(whiskers);
    }

    addFurDetails() {
        // Add subtle fur texture using normal mapping - apply to both black and white fur
        const textureLoader = new THREE.TextureLoader();

        // Create procedural normal map for fur effect
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#8080ff'; // Flat normal
        ctx.fillRect(0, 0, 512, 512);

        // Generate fur-like pattern
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const length = Math.random() * 5 + 2;
            const angle = Math.random() * Math.PI * 2;

            // Random perturbation for normal map direction
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);

            ctx.strokeStyle = `rgba(${r}, ${g}, 255, ${Math.random() * 0.5 + 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
            ctx.stroke();
        }

        const normalMap = new THREE.CanvasTexture(canvas);
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.repeat.set(4, 4);

        this.materials.blackFurMaterial.normalMap = normalMap;
        this.materials.blackFurMaterial.needsUpdate = true;

        this.materials.whiteFurMaterial.normalMap = normalMap;
        this.materials.whiteFurMaterial.needsUpdate = true;
    }

    getGroup() {
        return this.group;
    }

    // Animation methods
    animateIdle(time) {
        // Subtle breathing animation
        const breathe = Math.sin(time * 2) * 0.01; // Reduced amplitude for bulkier body
        if (this.body) {
            this.body.scale.y = 0.8 + breathe; // Base scale is 0.8
        }

        // Tail sway
        if (this.tail) {
            this.tail.rotation.x = Math.sin(time * 1.5) * 0.08;
            this.tail.rotation.y = Math.cos(time * 1) * 0.05;
        }
    }

    animateSit() {
        // Sitting position adjustments
        if (this.body) {
            this.body.position.y = 0.5;
            this.body.rotation.x = 0.25;
        }
    }

    animateStand() {
        // Standing position
        if (this.body) {
            this.body.position.y = 0.6;
            this.body.rotation.x = 0;
        }
    }

    setFurColor(color) {
        // Only update the black fur part to allow user customization of the "coat"
        this.materials.blackFurMaterial.color.setHex(color);
    }

    toggleWireframe(enabled) {
        this.materials.blackFurMaterial.wireframe = enabled;
        this.materials.whiteFurMaterial.wireframe = enabled;
    }
}
