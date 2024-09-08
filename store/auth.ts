import { defineStore } from 'pinia';

interface UserPayloadInterface {
    username: string;
    password: string;
    privateKey: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        username: '',
        privateKey: '',
    }),
    actions: {
        async authenticateUser({ username, password, privateKey }: UserPayloadInterface) {
            // useFetch from nuxt 3
            const { data, pending, error }: any = await useFetch('https://dummyjson.com/auth/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    username,
                    password,
                },
            });
            this.loading = pending;

            if (error?.value) {
                console.log({error})
                alert(error.value);
                this.authenticated = false;
                return;
            }
            if (data.value) {
                const token = useCookie('token', {expires: new Date(new Date().getTime() + 60 * 60 * 1000)}); // useCookie new hook in nuxt 3
                token.value = data?.value?.token; // set token to cookie

                this.authenticated = true; // set authenticated  state value to true
                this.username = username;
                this.privateKey = privateKey;
            }
        },
        logUserOut() {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            this.username = '';
            this.privateKey = '';
            token.value = null; // clear the token cookie
        },
    },
});
