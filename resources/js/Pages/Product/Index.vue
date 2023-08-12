<template>
<div>
    <admin-layout>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Productos</h3>
                        <div class="card-tools">
                            <button type="submit" class="btn btn-info text-uppercase" @click="openModal">
                                Crear
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products.data" :key="index">
                                    <td>{{product.id}}</td>
                                    <td>{{product.name}}</td>
                                    <td>{{product.description}}</td>
                                    <td>
                                        <button class="btn btn-success" @click="editModal(product)">Editar</button>
                                        <button class="btn btn-danger" @click="deleteProduct(product)">Eliminar</button>
                                        <!-- <inertia-link :href="route('products.edit', product.id)">Editar</inertia-link> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer clearfix">
                        <pagination :links="products.links"></pagination>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-lg">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ formTitle }}</h4>
                        <button type="button" class="close" @click="closeModal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body overflow-hidden">
                        <!-- <div class="h4">
                            <span>Preview:</span>
                        </div> -->
                        <div class="card card-primary">
                            <form @submit.prevent="checkMode">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="" class="h4">Nombre</label>
                                        <input type="text" class="form-control" placeholder="Nombre del Producto" v-model="form.name">
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="h4">Descripción</label>
                                        <input type="text" class="form-control" placeholder="Descripción del Producto" v-model="form.description">
                                    </div>
                                </div>

                                <div class="modal-footer justify-content-between">
                                    <button type="button" class="btn btn-danger text-uppercase" @click="closeModal">
                                        Cancel
                                    </button>
                                    <button type="submit" class="btn btn-info text-uppercase">{{ buttonTxt }}</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </admin-layout>
</div>
</template>

<script>
import AdminLayout from '@/Layouts/AdminLayout'
import Pagination from '@/Components/Pagination'

    export default {
        props: ['products'],
        components: {
            AdminLayout,
            Pagination
        },
        data() {
            return {
                editedIndex: -1,
                editMode: false,
                form: this.$inertia.form({
                    id: '',
                    name: '',
                    description: ''
                }),
            }
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Crear Nuevo Producto' : 'Editar Producto';
            },
            buttonTxt() {
                return this.editedIndex === -1 ? 'Crear' : 'Editar';
            },
            checkMode() {
                return this.editMode === false ? this.createProduct() : this.editProduct();
            }
        },
        mounted() {
            this.tabla()
        },
        methods: {
            tabla() {
                this.$nextTick(() =>{
                    $('#data').DataTable();
                });
            },
            editModal(product) {
                this.editMode = true
                $('#modal-lg').modal('show')
                this.editedIndex = this.products.data.indexOf(product)
                this.form.name = product.name
                this.form.id = product.id
                this.form.description = product.description
            },
            openModal() {
                this.editMode = false
                this.form.reset()
                this.editedIndex = -1
                $('#modal-lg').modal('show')
            },
            closeModal() {
                this.editMode = false
                this.form.reset()
                $('#modal-lg').modal('hide')
            },
            createProduct() {
                this.form.post(this.route('products.store'), {
                    preserveScroll: true,
                    onSuccess:() => {
                        Toast.fire({
                            icon: 'success',
                            title: 'producto creado'
                        })
                        this.form.reset()
                        this.closeModal()
                    }
                })
            },
            editProduct() {
                this.form.patch(this.route('products.update' , this.form.id, this.form), {
                    preserveScroll: true,
                    onSuccess:() => {
                        this.form.reset()
                        this.closeModal()
                        Toast.fire({
                            icon: 'success',
                            title: 'producto editado'
                        })
                    }
                })
            },
            deleteProduct(product) {
                Swal.fire({
                    title: 'Estas seguro?',
                    text: "¡no podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar'
                }).then((result) => {
                    if(result.isConfirmed) {
                        this.form.delete(this.route('products.destroy', product), {
                            preserveScroll: true,
                            onSuccess: ()=> {
                                Swal.fire(
                                    'Eliminado',
                                    'El Producto fue eliminado',
                                    'success'
                                )
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>