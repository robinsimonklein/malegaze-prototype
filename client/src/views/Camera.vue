<template>
  <div class="camera">
    <h1>Camera</h1>
      <QRCode v-if="mobileUrl" :url="mobileUrl"/>
  </div>
</template>


<script>
    // @ is an alias to /src
    import QRCode from "../components/QRCode";
    import {ID} from "@/js/utils.js"
    export default {
        name: 'Camera',
        data() {
            return {
                mobileUrl: null
            }
        },
        sockets: {
            connect: () => {
                console.log('socket connected')
            }
        },
        components: {
            QRCode
        },
        created() {
            // TODO: génération d'URL plus propre, via le router si possible
            this.mobileUrl = process.env.VUE_APP_PUBLIC_HOST +':'+ process.env.VUE_APP_PUBLIC_PORT + '/#/camera/' + ID(9)
        },
        mounted() {
            console.log(this.$socket)
        }
    }
</script>
