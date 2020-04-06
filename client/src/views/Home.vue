<template>
    <v-content>
        <v-container class="home d-flex flex-column align-center justify-center fill-height" fluid>
            <v-alert
                    outlined
                    color="warning"
                    text
                    class="text-center"
            >
                Si la partie de mobile ne fonctionne pas la première fois, patientez 30-40 secondes et rechargez la page.<br>

                (Serveur hébergé gratuitement sur Heroku)
            </v-alert>

            <h1>Male Gaze - prototypes</h1>
            <v-card
                    class="mx-auto"
                    tile
            >
                <v-list>
                    <v-list-item @click="$router.push('Transitions')">
                        <v-list-item-icon>
                            <v-icon>mdi-transition</v-icon>
                        </v-list-item-icon>
                        <span>Camera transitions</span>
                    </v-list-item>
                    <v-list-item @click="$router.push('Camera')">
                        <v-list-item-icon>
                            <v-icon>mdi-cellphone</v-icon>
                        </v-list-item-icon>
                        <span>Mobile controls</span>
                    </v-list-item>
                    <v-list-item @click="$router.push('Video')">
                        <v-list-item-icon>
                            <v-icon>mdi-filmstrip</v-icon>
                        </v-list-item-icon>
                        <span>Video</span>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Home',
        components: {},
    }
</script>

<style lang="scss">
h1{
    margin-top: 2rem;
    margin-bottom: 2rem;
}
</style>
