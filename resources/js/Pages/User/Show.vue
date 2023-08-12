<template>
    <app-layout>
        <div class="mt-4">
            <jet-label :value="'Nombre: ' + user.name" />
            <jet-label :value="'Email: ' + user.email" />
        </div>
    </app-layout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout'
import JetLabel from '@/Jetstream/Label'

    export default {
        props: ['user'],
        components: {
            AppLayout,
            JetLabel
        }
    }
</script>

<style lang="scss" scoped>

</style>