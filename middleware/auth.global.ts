import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    const { authenticated } = useAuthStore(); // use authenticateUser action from  auth store

    const publicPages = ['/login', '/register', '/forgot-password'];
    const authRequired = !publicPages.includes(to.path);


    if (!authenticated && authRequired) {
        return navigateTo('/login')
    }
})
