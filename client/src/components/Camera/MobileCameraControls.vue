<template>
    <div class="mobile-camera-controller">
        <div class="row">
            <div class="col-6">
                <v-btn @click="motionRequest">Motion Permission</v-btn>
                <p>Orientation permission : {{ orientationPermission }}</p>
                <p>alpha : {{ orientation.alpha }}</p>
                <p>beta : {{ orientation.beta }}</p>
                <p>gamma : {{ orientation.gamma }}</p>
            </div>
            <div class="col-6">
                <v-slider
                        :label="'Focale : '+ focalLength +'mm'"
                        v-model="focalLength"
                        min="1"
                        max="150"
                        vertical
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MobileCameraControls",
        data() {
            return {
                focalLength: 35,
                orientation: {
                    alpha: 0,
                    beta: 0,
                    gamma: 0,
                },
                screenOrientation: 0,
                orientationPermission: false
            }
        },
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            }
        },
        methods: {
            emitEffect() {
                if(this.mobileId) {
                    this.$socket.emit('camera_effect', {
                        focalLength: this.focalLength,
                    })
                }
            },
            emitOrientation() {
                if(this.mobileId) {
                    this.$socket.emit('device_orientation', this.orientation)
                }
            },
            emitScreenOrientation() {
                if(this.mobileId) {
                    this.$socket.emit('screen_orientation', this.screenOrientation)
                }
            },
            listenOrientation() {
                this.orientationPermission = true
                window.addEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
                window.addEventListener( 'deviceorientation', this.onDeviceOrientationChangeEvent, false );
            },
            onScreenOrientationChangeEvent() {
                this.screenOrientation = window.orientation || 0
                this.emitScreenOrientation()
            },
            onDeviceOrientationChangeEvent(e) {
                this.orientation.alpha = e.alpha;
                this.orientation.beta = e.beta;
                this.orientation.gamma = e.gamma;
                this.emitOrientation();
            },
            motionRequest() {
                if (typeof DeviceOrientationEvent.requestPermission === 'function' ) {
                    // iOS 13+

                    DeviceOrientationEvent.requestPermission().then( ( response ) => {

                        if ( response == 'granted' ) {
                            this.listenOrientation()
                        }

                    } ).catch( function ( error ) {
                        console.error( 'THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:', error );
                    } );

                } else {
                    // Other devices

                    this.listenOrientation()
                }
            },
        },
        watch: {
            focalLength() {
                this.emitEffect()
            }
        },
        mounted() {

        }

    }
</script>
