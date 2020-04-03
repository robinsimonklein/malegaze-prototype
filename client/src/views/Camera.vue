<template>
  <div class="camera">
    <h1>Camera</h1>
      <QRCode url="https://www.google.com" />
  </div>
</template>


<script>
    // @ is an alias to /src
    import QRCode from "../components/QRCode";
    export default {
        name: 'Camera',
        components: {
            QRCode
        }
    }
</script>
