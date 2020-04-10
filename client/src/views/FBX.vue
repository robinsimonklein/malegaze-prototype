<template>
    <div class="fbx" id="fbx">

    </div>
</template>

<script>
    import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

    export default {
        name: "FBX",
        data() {

            return {
                started: false,

                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                videoTexture: null,
                video: null,
                controls: null,
                cube: null,
                cinema: null,
            }
        },

        methods: {
            start() {
                this.started = true

                this.init()
            },
            init() {
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



                this.renderer = new THREE.WebGLRenderer();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                const element = document.getElementById('fbx')
                element.appendChild(this.renderer.domElement);


                // light
                this.light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
                this.light.position.set( 0, 200, 0 );
                this.scene.add( this.light );

                this.light = new THREE.DirectionalLight( 0xffffff );
                this.light.position.set( 0, 200, 100 );
                this.light.castShadow = true;
                this.light.shadow.camera.top = 180;
                this.light.shadow.camera.bottom = - 100;
                this.light.shadow.camera.left = - 120;
                this.light.shadow.camera.right = 120;
                this.scene.add( this.light );



                // model
                var loader = new FBXLoader();
                loader.setPath('models/fbx/cinema/')
                loader.load( 'cinema.fbx', ( object ) => {

                    // this.mixer = new THREE.AnimationMixer( object );

                    // var action = mixer.clipAction( object.animations[ 0 ] );
                    // action.play();

                    object.traverse( ( child ) => {

                        if ( child.isMesh ) {

                            child.castShadow = true;
                            child.receiveShadow = true;

                        }

                    } );

                    this.scene.add( object );

                } );

                this.geometry = new THREE.BoxGeometry();
                this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
                this.cube = new THREE.Mesh(this.geometry, this.material);
                // this.scene.add(this.cube);


                this.controls = new OrbitControls(this.camera, this.renderer.domElement)

                this.camera.position.z = 500;
                this.camera.position.y = 300;


                this.controls.update()


                this.animate();
            },

            animate() {
                requestAnimationFrame(this.animate);

                this.controls.update()

                this.render();
            },

            render() {
                this.renderer.render(this.scene, this.camera);
            },

            resize() {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        },
        mounted() {
            this.start()
        }
    }
</script>

<style scoped>

</style>
