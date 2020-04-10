<template>
    <div class="dae" id="dae">

    </div>
</template>

<script>
    import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";

    export default {
        name: "DAE",
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
                const element = document.getElementById('dae')
                element.appendChild(this.renderer.domElement);

                // loading manager

                var loadingManager = new THREE.LoadingManager( () => {

                    this.scene.add( this.cinema );

                } );

                // collada

                var loader = new ColladaLoader( loadingManager );
                loader.setPath('models/dae/')
                loader.load( 'cinema.dae', ( collada ) => {

                    this.cinema = collada.scene;

                } );


                /*
                // light
                var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
                this.scene.add( ambientLight );

                var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
                directionalLight.position.set( 1, 1, 0 ).normalize();
                this.scene.add( directionalLight );

                 */


                this.geometry = new THREE.BoxGeometry();
                this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
                this.cube = new THREE.Mesh(this.geometry, this.material);
                // this.scene.add(this.cube);


                this.controls = new OrbitControls(this.camera, this.renderer.domElement)

                this.camera.position.z = 4;
                this.camera.position.y = 3;


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
