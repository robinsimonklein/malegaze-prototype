<template>
    <div class="video">
        <video class="video__player" controls loop>
            <source src="@/assets/video/mid90.mp4" type="video/mp4">
        </video>
        <div class="video__scene"></div>
        <div v-if="!started" class="video__overlay d-flex flex-column justify-center align-center">
            <v-btn @click="start" color="primary">Start</v-btn>
            <p style="color: white">(user interaction needed)</p>
        </div>
    </div>
</template>

<script>
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

    export default {
        name: "Video",
        data() {
            return {
                started: false,

                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                videoTexture: null,
                video: null,
                controls: null
            }
        },
        methods: {
            start() {
                this.started = true

                this.init()
            },
            init() {
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

                const light = new THREE.DirectionalLight(0xffffff);
                light.position.set(0, 1, 1).normalize();
                this.scene.add(light);

                const geometry = new THREE.BoxGeometry(64, 36, 2);

                this.video = document.querySelector('video');
                this.videoTexture = new THREE.VideoTexture(this.video);
                this.videoTexture.minFilter = THREE.LinearFilter;
                this.videoTexture.magFilter = THREE.LinearFilter;
                this.videoTexture.format = THREE.RGBFormat;

                this.video.load();

                const material = new THREE.MeshPhongMaterial({map: this.videoTexture});

                // const face1 = [new THREE.Vector2(0, .5), new THREE.Vector2(.3333, .5), new THREE.Vector2(.3333, 1), new THREE.Vector2(0, 1)];
                // const face2 = [new THREE.Vector2(.3333, .5), new THREE.Vector2(.6666, .5), new THREE.Vector2(.6666, 1), new THREE.Vector2(.3333, 1)];
                // const face3 = [new THREE.Vector2(.6666, .5), new THREE.Vector2(1, .5), new THREE.Vector2(1, 1), new THREE.Vector2(.6666, 1)];
                // const face4 = [new THREE.Vector2(0, 0), new THREE.Vector2(.3333, 0), new THREE.Vector2(.3333, .5), new THREE.Vector2(0, .5)];
                const face5 = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];
                // const face6 = [new THREE.Vector2(.6666, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, .5), new THREE.Vector2(.6666, .5)];

                geometry.faceVertexUvs[0] = [];

                // geometry.faceVertexUvs[0][0] = [face1[0], face1[1], face1[3]];
                // geometry.faceVertexUvs[0][1] = [face1[1], face1[2], face1[3]];

                // geometry.faceVertexUvs[0][2] = [face2[0], face2[1], face2[3]];
                // geometry.faceVertexUvs[0][3] = [face2[1], face2[2], face2[3]];

                // geometry.faceVertexUvs[0][4] = [face3[0], face3[1], face3[3]];
                // geometry.faceVertexUvs[0][5] = [face3[1], face3[2], face3[3]];

                // geometry.faceVertexUvs[0][6] = [face4[0], face4[1], face4[3]];
                // geometry.faceVertexUvs[0][7] = [face4[1], face4[2], face4[3]];

                geometry.faceVertexUvs[0][8] = [face5[3], face5[0], face5[2]];
                geometry.faceVertexUvs[0][9] = [face5[0], face5[1], face5[2]];

                // geometry.faceVertexUvs[0][10] = [face6[0], face6[1], face6[3]];
                // geometry.faceVertexUvs[0][11] = [face6[1], face6[2], face6[3]];



                this.mesh = new THREE.Mesh(geometry, material);
                this.mesh.position.z = -50;
                this.mesh.rotation.set(-.1, .5, 0)

                this.scene.add(this.mesh);

                this.renderer = new THREE.WebGLRenderer();
                this.renderer.setSize(window.innerWidth, window.innerHeight);

                const sceneElement = document.querySelector('.video__scene')
                sceneElement.appendChild(this.renderer.domElement);


                this.video.play()
                window.addEventListener('resize', this.resize, false);

                this.controls = new OrbitControls(this.camera, this.renderer.domElement)

                this.camera.position.set(0, 0, 0)
                this.controls.update()

                this.render();

                this.animate()
            },

            animate() {
                requestAnimationFrame(this.animate);
                // this.mesh.rotation.x += 0.005;
                // this.mesh.rotation.y += 0.005;

                this.controls.update()

                this.render();
            },

            render() {
                this.renderer.render(this.scene, this.camera);
            },

            resize(){
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( window.innerWidth, window.innerHeight );
            }

        },
    }
</script>

<style lang="scss" scoped>
    .video {
        &__player {
            display: none;
        }
        &__overlay {
            background: black;
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
            width: 100vw;

        }
    }
</style>
