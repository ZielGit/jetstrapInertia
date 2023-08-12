<template>
    <app-layout>
        <div class="card">
            <div class="card-body">
                <inertia-link class="btn btn-primary" :href="route('users.create')">Crear Usuario</inertia-link>

                <table id="data" class="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{user.id}}</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>
                                <inertia-link class="btn btn-success" :href="route('users.show', user.id)">Ver</inertia-link>
                                <inertia-link class="btn btn-warning" :href="route('users.edit', user.id)">Editar</inertia-link>
                                <!-- <inertia-link class="btn btn-danger" method="delete" :href="route('users.destroy', user.id)">Eliminar</inertia-link> -->
                                <!-- <inertia-link></inertia-link> -->
                                <button class="btn btn-danger" @click="deleteUser(user)">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AdminLayout'
// import datatable from 'datatables.net-bs4'

import { Inertia } from '@inertiajs/inertia'

    export default {
        props: ['users'],
        components: { 
            AppLayout,
            // datatable
        },
        mounted(){
            this.tabla()
        },
        methods: {
            tabla(){
                this.$nextTick(() =>{
                    $('#data').DataTable();
                });
            },
            deleteUser: function(data){
                if(!confirm("¿Seguro que quieres eliminar el usuario: "+data.name+"?")) return;

                Inertia.delete(route("users.destroy", {user: data}));
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>