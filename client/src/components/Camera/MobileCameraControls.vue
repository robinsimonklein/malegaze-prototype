<template>
    <div class="mobile-camera-controller">
        <v-btn @click="motionRequest">Motion</v-btn>
        <p>Orientation permission : {{ orientationPermission }}</p>
        <p>alpha : {{ orientation.alpha }}</p>
        <p>beta : {{ orientation.beta }}</p>
        <p>gamma : {{ orientation.gamma }}</p>
        <v-form>
            <v-slider
                    :label="'Focale : '+ focalLength +'mm'"
                    v-model="focalLength"
                    min="10"
                    max="150"
                    vertical
            />
            <p>Rotation</p>
            <v-slider
                    :label="'x : '+rotationX"
                    v-model="rotationX"
                    min="-1"
                    max="1"
                    step="0.1"
            />
            <v-slider
                    :label="'y : '+rotationY"
                    v-model="rotationY"
                    min="-0.2"
                    max="0.2"
                    step="0.02"
            />
            <v-slider
                    :label="'z: '+rotationZ"
                    v-model="rotationZ"
                    min="-1"
                    max="1"
                    step="0.1"
            />
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "MobileCameraControls",
        data() {
            return {
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                focalLength: 35,
                absolute: null,
                alpha: null,
                beta: null,
                gamma: null,
                orientation: {
                    alpha: 0,
                    beta: 0,
                    gamma: 0,
                },
                orientationPermission: false
            }
        },
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            }
        },
        methods: {
            emitPosition() {
                if(this.mobileId) {
                    this.$socket.emit('camera_position', {
                        x: this.x,
                        y: this.y,
                        z: this.z,
                    })
                }
            },
            emitRotation() {
                if(this.mobileId) {
                    this.$socket.emit('camera_rotation', {
                        x: this.rotationX,
                        y: -this.rotationY,
                        z: this.rotationZ,
                    })
                }
            },
            emitEffect() {
                if(this.mobileId) {
                    this.$socket.emit('camera_effect', {
                        focalLength: this.focalLength,
                    })
                }
            },

            onScreenOrientationChangeEvent() {

            },
            onDeviceOrientationChangeEvent(e) {
                this.orientation.alpha = e.alpha;
                this.orientation.beta = e.beta;
                this.orientation.gamma = e.gamma;
            },
            motionRequest() {
                // iOS 13+

                if (typeof DeviceOrientationEvent.requestPermission === 'function' ) {

                    DeviceOrientationEvent.requestPermission().then( ( response ) => {

                        if ( response == 'granted' ) {
                            this.orientationPermission = true
                            window.addEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
                            window.addEventListener( 'deviceorientation', this.onDeviceOrientationChangeEvent, false );

                        }

                    } ).catch( function ( error ) {

                        console.error( 'THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error );

                    } );

                } else {

                    this.orientationPermission = true
                    window.addEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
                    window.addEventListener( 'deviceorientation', this.onDeviceOrientationChangeEvent, false );

                }
            },
            stream() {
                requestAnimationFrame(this.stream)

                this.$socket.emit('device_orientation', this.orientation)
            }
        },
        watch: {
            rotationX() {
                this.emitRotation()
            },
            rotationY() {
                this.emitRotation()
            },
            rotationZ() {
                this.emitRotation()
            },
            focalLength() {
                this.emitEffect()
            }
        },
        mounted() {
            this.stream()
        }

    }
</script>

<style scoped>

</style>
