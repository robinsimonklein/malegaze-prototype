<template>
    <v-container class="camera">
        <template v-if="started">
            <MobileCameraControls/>
        </template>
        <template v-else>
            <h1>MobileCamera</h1>
            <p>ID : {{ mobileId }}</p>
            <p>Started : {{ started }}</p>
            <v-btn
                    @click="startCamera"
                    color="primary"
            >Commencer</v-btn>
        </template>
    </v-container>
</template>


<script>
    // @ is an alias to /src
    import MobileCameraControls from "../components/Camera/MobileCameraControls";
    export default {
        name: 'Camera',
        components: {MobileCameraControls},
        data() {
            return {
                started: false
            }
        },
        sockets: {
            started_camera() {
                this.started = true
            }
        },
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            }
        },
        methods: {
            startCamera() {
                this.$socket.emit('start_camera')
            }
        },
        mounted() {
            this.$socket.emit('join_mobile_room', {
                mobileId: this.mobileId
            })
        }
    }
</script>
