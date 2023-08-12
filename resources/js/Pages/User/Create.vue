<template>
    <app-layout>
        <form @submit.prevent="submit">
            <label for="">Nombre:</label>
            <input type="text" v-model="form.name">

            <label for="">Email:</label>
            <input type="text" v-model="form.email">

            <label for="">Contraseña:</label>
            <input type="password" v-model="form.password">

            <button type="submit">Enviar</button>
        </form>
    </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AdminLayout'
import { Inertia } from '@inertiajs/inertia'

    export default {
        props: ["users"],
        data(){
            return{
                form:{
                    name: null,
                    email: "@gmail.com",
                    password: null
                }
            }
        },
        components:{
            AppLayout
        },
        methods: {
            submit(){
                Inertia.post(route('users.store'), this.form);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>