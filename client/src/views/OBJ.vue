<template>
    <div class="obj" id="obj">

    </div>
</template>

<script>
    import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
    import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
    import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";

    export default {
        name: "OBJ",
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
                const element = document.getElementById('obj')
                element.appendChild(this.renderer.domElement);

                // model

                var onProgress = ( xhr ) => {

                    if ( xhr.lengthComputable ) {

                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

                    }

                };

                var onError = function () { };

                var manager = new THREE.LoadingManager();
                manager.addHandler( /\.dds$/i, new DDSLoader() );

                // comment in the following line and import TGALoader if your asset uses TGA textures
                // manager.addHandler( /\.tga$/i, new TGALoader() );

                new MTLLoader( manager )
                    .setPath( './models/obj/cinema/' )
                    .load( 'cinema.mtl', ( materials ) => {

                        materials.preload();

                        new OBJLoader( manager )
                            .setMaterials( materials )
                            .setPath( './models/obj/cinema/' )
                            .load( 'cinema.obj',  ( object ) => {

                                object.position.y = - 95;
                                this.scene.add( object );

                            }, onProgress, onError );

                    } );

                //


                // light
                var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
                this.scene.add( ambientLight );

                var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
                directionalLight.position.set( 1, 1, 0 ).normalize();
                this.scene.add( directionalLight );




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
