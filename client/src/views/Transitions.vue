<template>
    <div id="transitions" class="transitions">
        <v-btn @click="changeCamera" class="camera-btn" fab><v-icon>mdi-video</v-icon></v-btn>
    </div>
</template>

<script>
    import * as THREE from 'three'

    export default {
        name: "Transitions",
        data() {
            return {
                scene: null,
                camera: null,
                cameras: null,
                cameraIndex: null,
                renderer: null,
                clock: null,
                player: null
            }
        },
        methods: {
            init(){
                this.clock = new THREE.Clock();

                this.scene = new THREE.Scene();
                let col = 0x605050;
                this.scene = new THREE.Scene();
                this.scene.background = new THREE.Color( col );
                this.scene.fog = new THREE.Fog( col, 10, 100 );

                this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
                this.camera.position.set(0, 4, 7);
                //camera.lookAt(0,0,0);

                const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
                this.scene.add(ambient);

                const light = new THREE.DirectionalLight(0xFFFFFF, 1);
                light.position.set( 1, 10, 6);
                this.scene.add(light);

                this.renderer = new THREE.WebGLRenderer({antialias: true});
                this.renderer.setSize( window.innerWidth, window.innerHeight );

                let sceneElement = document.getElementById('transitions')
                sceneElement.appendChild( this.renderer.domElement );


                //scene plate
                const planeGeometry = new THREE.PlaneGeometry(200, 200);
                const planeMaterial = new THREE.MeshStandardMaterial();
                const plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.rotation.x = -Math.PI/2;
                this.scene.add(plane);

                //add grid on scene
                const grid = new THREE.GridHelper( 200, 80);
                this.scene.add( grid );

                //add player mesh
                this.player = new THREE.Group();
                this.scene.add(this.player);

                const bodyGeometry = new THREE.CylinderBufferGeometry(0.5, 0.3, 1.6, 20);
                const material = new THREE.MeshStandardMaterial({color : 0xffff00});

                const body = new THREE.Mesh(bodyGeometry, material);
                body.position.y = 0.8;
                body.scale.z = 0.5;
                this.player.add(body);

                const headGeometry = new THREE.SphereBufferGeometry(0.3, 20, 15);
                const head = new THREE.Mesh(headGeometry, material);
                head.position.y = 2.0;
                this.player.add(head);

                this.addKeyboardControl();

                //Add cameras
                this.cameras = [];
                this.cameraIndex = 0;

                const followCam = new THREE.Object3D();
                followCam.position.copy(this.camera.position);
                this.player.add(followCam);
                this.cameras.push(followCam);

                const frontCam = new THREE.Object3D();
                frontCam.position.set(0, 3, -8);
                this.player.add(frontCam);
                this.cameras.push(frontCam);

                const overHeadCam = new THREE.Object3D();
                overHeadCam.position.set(0, 20, 0);
                this.cameras.push(overHeadCam);

                window.addEventListener( 'resize', this.resize, false);

                this.update();
            },

            changeCamera(){
                this.cameraIndex++;
                if (this.cameraIndex>=this.cameras.length) this.cameraIndex = 0;
            },

            addKeyboardControl(){
                document.addEventListener( 'keydown', this.keyDown );
                document.addEventListener( 'keyup', this.keyUp );
            },

            keyDown(evt){
                let forward = (this.player.userData!==undefined && this.player.userData.move!==undefined) ? this.player.userData.move.forward : 0;
                let turn = (this.player.userData!=undefined && this.player.userData.move!==undefined) ?  this.player.userData.move.turn : 0;

                switch(evt.keyCode){
                    case 90:
                        forward = -1;
                        break;
                    case 83:
                        forward = 1;
                        break;
                    case 81:
                        turn = 1;
                        break;
                    case 68:
                        turn = -1;
                        break;
                }

                this.playerControl(forward, turn);
            },

            keyUp(evt){
                let forward = (this.player.userData!==undefined && this.player.userData.move!==undefined) ? this.player.userData.move.forward : 0;
                let turn = (this.player.move!=undefined && this.player.userData.move!==undefined) ?  this.player.userData.move.turn : 0;

                switch(evt.keyCode){
                    case 90:
                        forward = 0;
                        break;
                    case 83:
                        forward = 0;
                        break;
                    case 81:
                        turn = 0;
                        break;
                    case 68:
                        turn = 0;
                        break;
                }

                this.playerControl(forward, turn);
            },

            playerControl(forward, turn){
                if (forward==0 && turn==0){
                    delete this.player.userData.move;
                }else{
                    if (this.player.userData===undefined) this.player.userData = {};
                    this.player.userData.move = { forward, turn };
                }
            },

            update(){
                requestAnimationFrame( this.update );
                this.renderer.render( this.scene, this.camera );

                const dt = this.clock.getDelta();

                if (this.player.userData!==undefined && this.player.userData.move!==undefined){
                    this.player.translateZ(this.player.userData.move.forward * dt * 5);
                    this.player.rotateY(this.player.userData.move.turn * dt);
                }

                //Add camera lerping
                this.camera.position.lerp(this.cameras[this.cameraIndex].getWorldPosition(new THREE.Vector3()), 0.05);

                const pos = this.player.position.clone();
                pos.y += 3;
                this.camera.lookAt(pos);
            },
            resize(){
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( window.innerWidth, window.innerHeight );
            }
        },
        mounted() {
            this.init();
        },
    }
</script>

<style lang="scss" scoped>
    .camera-btn {
        position: fixed;
        z-index: 2;
        top: 1rem;
        left: 1rem;
    }
</style>
