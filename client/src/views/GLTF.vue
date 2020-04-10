<template>
    <div class="glTF" id="gltf">

    </div>
</template>

<script>
    import * as THREE from "three";
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

    export default {
        name: "GLTF",
        data() {

            return {
                started: false,

                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                controls: null,
                cube: null,
                light: null,
                cinema: null,
                rectLight: null,
                rectLightPos: {
                    x: 0,
                    y: 310,
                    z: -350,
                }
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
                const element = document.getElementById('gltf')
                element.appendChild(this.renderer.domElement);


                // light
                var ambientLight = new THREE.AmbientLight( 0xcccccc, 1 );
                this.scene.add( ambientLight );



                var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
                directionalLight.position.set( 0, 1, 0 );
                directionalLight.castShadow = true
                this.scene.add( directionalLight );


                this.light = new THREE.PointLight(0xc4c4c4, .1);
                this.light.position.set(0, 30, 50)
                this.scene.add(this.light)

                this.light = new THREE.PointLight(0xc4c4c4, .1);
                this.light.position.set(50, 30, 0)
                this.scene.add(this.light)

                this.light = new THREE.PointLight(0xc4c4c4, .1);
                this.light.position.set(30, 30, -50)
                this.scene.add(this.light)

                this.light = new THREE.PointLight(0xc4c4c4, .1);
                this.light.position.set(-50, 30, 0)
                this.scene.add(this.light)




                // Area light
                this.rectLight = new THREE.RectAreaLight( 0xffffff, 3,  400, 200 );
                this.rectLight.position.set( 0, 0, 1000 );
                this.rectLight.lookAt( 0, 0, 0 );
                // this.scene.add(this.rectLight )

                /*
                // loader
                var loader = new GLTFLoader();

                loader.load( 'models/gltf/cinema.gltf', ( gltf ) => {

                    this.scene.add( gltf.scene );

                }, undefined,  ( error ) => {

                    console.error( error );

                } );

                 */

                var loader = new GLTFLoader().setPath( 'models/gltf/cinema/' );
                loader.load( 'MaleGaze_SCENES01.glb',  ( gltf ) => {

                    gltf.scene.traverse( ( child ) => {

                        if ( child.isMesh ) {

                            // roughnessMipmapper.generateMipmaps( child.material );

                        }

                    } );

                    this.scene.add( gltf.scene );

                    // roughnessMipmapper.dispose();


                } );



                this.geometry = new THREE.BoxGeometry();
                this.material = new THREE.MeshLambertMaterial({color: 0x00ff00});
                this.cube = new THREE.Mesh(this.geometry, this.material);
                // this.scene.add(this.cube);


                this.controls = new OrbitControls(this.camera, this.renderer.domElement)

                this.camera.position.z = 5;
                this.camera.position.y = 3;

                var axesHelper = new THREE.AxesHelper( 500 );
                this.scene.add(axesHelper)


                this.controls.update()


                this.animate();
            },

            animate() {
                requestAnimationFrame(this.animate);

                this.rectLight.position.set( this.rectLightPos.x, this.rectLightPos.y, this.rectLightPos.z );
                this.rectLight.lookAt( 0, 0, 0 );

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
