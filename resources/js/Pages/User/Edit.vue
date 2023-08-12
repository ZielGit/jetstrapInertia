<template>
    <app-layout>
        <form @submit.prevent="submit">
            <jet-label value="Nombre:" />
            <jet-input type="text" v-model="form.name" />

            <jet-label value="Email:" />
            <jet-input type="text" v-model="form.email" />

            <jet-label value="Password:" />
            <jet-input type="password" v-model="form.password" />

            <button type="submit">Actualizar</button>
        </form>
    </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AdminLayout'
import JetLabel from '@/Jetstream/Label'
import JetInput from '@/Jetstream/Input'
// import { Inertia } from '@inertiajs/inertia'

    export default {
        props: ["user"],
        data(){
            return {
                form: {
                    name: this.user.name,
                    email: this.user.email,
                    password: ""
                }
            }
        },
        components: {
            AppLayout,
            JetLabel,
            JetInput
        },
        methods: {
            submit() {
                this.$inertia.put(route("users.update", {'user':this.user}), this.form);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>