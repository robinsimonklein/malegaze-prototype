import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // Camera
    {
        path: '/camera',
        name: 'Camera',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Camera.vue')
    },
    {
        path: '/camera/:mobileId',
        name: 'MobileCamera',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MobileCamera.vue')
    },
    // Transitions
    {
        path: '/transitions',
        name: 'Transitions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Transitions.vue')
    },
    // Video
    {
        path: '/video',
        name: 'Video',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Video.vue')
    },
    // dae
    {
        path: '/dae',
        name: 'DAE',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/DAE.vue')
    },
    // obj
    {
        path: '/obj',
        name: 'OBJ',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/OBJ.vue')
    },
    // fbx
    {
        path: '/fbx',
        name: 'FBX',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/FBX.vue')
    },
    // fbx2
    {
        path: '/fbx2',
        name: 'FBX2',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/FBX2.vue')
    },
    // glTF
    {
        path: '/gltf',
        name: 'GLTF',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/GLTF.vue')
    },

]

const router = new VueRouter({
    routes
})

export default router
