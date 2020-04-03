<template>
    <div class="camera">
        <h1>MobileCamera</h1>
        <p>ID : {{ mobileId }}</p>
    </div>
</template>


<script>
    // @ is an alias to /src
    export default {
        name: 'Camera',
        data() {
            return {

            }
        },
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            }
        },
        created() {

        }
    }
</script>
