<template>
    <div class="mobile-camera-controller">
        <v-form>
            <v-slider
                    :label="'x : '+x"
                    v-model="x"
                    min="-10"
                    max="10"
            />
            <v-slider
                    :label="'y : '+y"
                    v-model="y"
                    min="-10"
                    max="10"
            />
            <v-slider
                    :label="'z : '+z"
                    v-model="z"
                    min="-10"
                    max="10"
            />
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "MobileCameraControls",
        data() {
            return {
                x: 0,
                y: 0,
                z: 0,
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
                console.log('test')
                if(this.mobileId) {
                    this.$socket.emit('camera_position', {
                        x: this.x,
                        y: this.y,
                        z: this.z,
                    })
                }
            }
        },
        watch: {
            x() {
                this.emitPosition()
            },
            y() {
                this.emitPosition()
            },
            z() {
                this.emitPosition()
            },
        }

    }
</script>

<style scoped>

</style>
