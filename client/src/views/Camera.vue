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
        components: {
            QRCode
        },
        created() {
            this.mobileUrl = process.env.VUE_APP_PUBLIC_HOST +':'+ process.env.VUE_APP_PUBLIC_PORT + '/#/camera/' + ID(9)
            console.log(this.mobileUrl)
        }
    }
</script>
