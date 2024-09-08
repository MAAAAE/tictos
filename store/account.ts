import { defineStore } from 'pinia';

interface AccountInterface {
    privateKey: string;
}

export const useAccountStore = defineStore('account', {
    state: () => ({
        privateKey: '',
    }),
    actions: {
        async fetchAccount({ privateKey }: AccountInterface) {
            if (privateKey) {
                this.privateKey = privateKey;
            }
        },

        clear() {
            this.privateKey = '';
        }
    },
});
