<template>
    <div class="mobile-camera-controller">
        <v-form>
            <v-slider
                    :label="'Zoom : '+ focalLength +'mm'"
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
        }

    }
</script>

<style scoped>

</style>
