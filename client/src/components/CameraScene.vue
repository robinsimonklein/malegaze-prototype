<template>
    <div class="camera-scene" ref="cameraScene">

    </div>
</template>

<script>
    import * as THREE from 'three'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import Stats from 'three/examples/jsm/libs/stats.module'
    // import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
    import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';

    export default {
        name: "CameraScene",
        data() {
            return {
                gui: null,
                stats: null,
                scene: null,
                renderer: null,
                camera: null,
                cameraSettings: {
                    position: {
                        x: -3.5,
                        y: 1.7,
                        z: 10,
                    },
                    rotation: {
                        x: 0,
                        y: -0.7,
                        z: 0,
                    },
                    focusDistance: 0
                },
                effectController:  {

                    focalLength: 35,
                    // jsDepthCalculation: true,
                    // shaderFocus: false,
                    //
                    fstop: 2.8,
                    maxblur: 1.5,
                    //
                    showFocus: false,
                    focalDepth: 3,
                    // manualdof: false,
                    // vignetting: false,
                    depthblur: true,
                    //
                    // threshold: 0.5,
                    // gain: 2.0,
                    // bias: 0.5,
                    // fringe: 0.7,
                    //
                    // focalLength: 35,
                    // noise: true,
                    // pentagon: false,
                    //
                    // dithering: 0.0001

                },
                mixer: null,
                light: null,
                controls: null,
            }
        },
        sockets: {
            camera_position(position) {
                this.cameraSettings.position = position
            },
            camera_rotation(rotation) {
                this.cameraSettings.rotation.x = 0 + rotation.x
                this.cameraSettings.rotation.y = -0.7 + rotation.y
                this.cameraSettings.rotation.z = 0 + rotation.z
            },
            camera_effect(effect) {
                this.effectController.focalLength = effect.focalLength

                this.matChanger()
                // this.effectController.focalDepth = effect.focalDepth
                // this.effectController.fstop = effect.fstop
            }
        },
        methods: {
            init() {
                this.renderer = new THREE.WebGLRenderer();
                this.renderer.setSize( window.innerWidth, window.innerHeight );
                this.renderer.shadowMap.enabled = true;
                this.$refs.cameraScene.appendChild(this.renderer.domElement)

                this.scene = new THREE.Scene();
                // this.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );
                this.camera = new CinematicCamera( 30, window.innerWidth/window.innerHeight, 0.1, 500 );
                // this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 500 );

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


                var loader = new GLTFLoader();

                loader.load( './models/scene.gltf', ( gltf ) => {

                    this.scene.add( gltf.scene );

                }, undefined, function ( error ) {

                    console.error( error );

                } );


                // Stats
                this.stats = new Stats();
                this.$refs.cameraScene.appendChild( this.stats.dom );


                this.camera.position.set(this.cameraSettings.position.x, this.cameraSettings.position.y, this.cameraSettings.position.z)
                this.camera.rotation.set(this.cameraSettings.rotation.x, this.cameraSettings.rotation.y, this.cameraSettings.rotation.z)



                // GUI
                /*

                this.gui = new GUI();

                this.gui.add( this.effectController, 'focalLength', 1, 135, 0.01 ).onChange( this.matChanger );
                this.gui.add( this.effectController, 'fstop', 1.8, 22, 0.01 ).onChange( this.matChanger );
                this.gui.add( this.effectController, 'focalDepth', 0.1, 100, 0.001 ).onChange( this.matChanger );
                this.gui.add( this.effectController, 'showFocus', true ).onChange( this.matChanger );

                 */

                this.matChanger();

            },
            animate() {
                requestAnimationFrame( this.animate );

                this.stats.update();

                this.camera.rotation.set(this.cameraSettings.rotation.x, this.cameraSettings.rotation.y, this.cameraSettings.rotation.z)

                this.camera.focusAt( this.cameraSettings.focusDistance );

                if ( this.camera.postprocessing.enabled ) {

                    this.camera.renderCinematic( this.scene, this.renderer );

                } else {

                    this.scene.overrideMaterial = null;

                    this.renderer.clear();
                    this.renderer.render( this.scene, this.camera );

                }
            },
            matChanger() {

                for ( var e in this.effectController ) {
                    if ( e in this.camera.postprocessing.bokeh_uniforms ) {
                        this.camera.postprocessing.bokeh_uniforms[ e ].value = this.effectController[e];
                    }
                }

                this.camera.postprocessing.bokeh_uniforms[ 'znear' ].value = this.camera.near;
                this.camera.postprocessing.bokeh_uniforms[ 'zfar' ].value = this.camera.far;
                this.camera.setLens( this.effectController.focalLength, this.camera.frameHeight, this.effectController.fstop, this.camera.coc );
                this.effectController[ 'focalDepth' ] = this.camera.postprocessing.bokeh_uniforms[ 'focalDepth' ].value;

            },
        },
        watch: {
            /*
            effectController: {
                handler(){
                    console.log('matChanger')
                    this.matChanger()
                },
                deep: true
            }

             */

        },
        mounted() {
            this.init();
            this.animate();
        }
    }
</script>

<style lang="scss" scoped>
    .camera-scene {
        position: fixed;
        z-index: 900;
        top: 0;
        left: 0;
    }
</style>
