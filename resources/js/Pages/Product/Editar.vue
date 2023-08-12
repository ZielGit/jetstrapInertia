<template>
    <app-layout>
        <form @submit.prevent="submit">
            <jet-label value="Nombre:" />
            <jet-input type="text" v-model="form.name" />

            <jet-label value="Descripción:" />
            <jet-input type="text" v-model="form.description" />

            <button type="submit">Actualizar</button>
        </form>
    </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout'
import JetLabel from '@/Jetstream/Label'
import JetInput from '@/Jetstream/Input'

    export default {
        props: ['product'],
        data(){
            return {
                form:{
                    name: this.$props.product.name,
                    description: this.$props.product.description
                }
            };
        },
        components: {
            AppLayout,
            JetLabel,
            JetInput
        },
        methods: {
            submit(){
                this.$inertia.put(route('products.update', {'product':this.product}), this.form);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>