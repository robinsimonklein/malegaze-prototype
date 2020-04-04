<template>
  <v-container class="camera">
    <h1>Camera</h1>
      <template v-if="started">
          <v-slider
                  :label="'x : '+position.x"
                  v-model="position.x"
                  min="-10"
                  max="10"
          />
          <v-slider
                  :label="'y : '+position.y"
                  v-model="position.y"
                  min="-10"
                  max="10"
          />
          <v-slider
                  :label="'z : '+position.z"
                  v-model="position.z"
                  min="-10"
                  max="10"
          />
      </template>
      <template v-else>
          <QRCode v-if="mobileUrl" :url="mobileUrl"/>
          <p>ID : {{ mobileId }}</p>
      </template>
  </v-container>
</template>


<script>
    // @ is an alias to /src
    import QRCode from "../components/QRCode";
    import {ID} from "@/js/utils.js"
    export default {
        name: 'Camera',
        data() {
            return {
                started: false,
                mobileId: null,
                mobileUrl: null,
                position: {
                    x: 0,
                    y: 0,
                    z: 0,
                }
            }
        },
        sockets: {
            connected: () => {
                console.log('connecté')
            },
            disconnect: () => {
                console.log('déconnecté')
            },
            started_camera() {
                this.started = true
            },
            camera_position(position) {
                this.position = position
            }
        },
        components: {
            QRCode
        },
        created() {
            // TODO: génération d'URL plus propre, via le router si possible
            this.mobileId = ID(9)
            this.mobileUrl = process.env.VUE_APP_PUBLIC_HOST +':'+ process.env.VUE_APP_PUBLIC_PORT + '/#/camera/' + this.mobileId
            this.$store.commit('setMobileId', this.mobileId)
        },
        mounted() {
            this.$socket.emit('join_mobile_room', {
                mobileId: this.mobileId
            })
        }
    }
</script>
