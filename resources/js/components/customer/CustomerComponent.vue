<template>
    <div class="row mt-5">
        <div class="col-lg-6">
            <div class="card border border-success">
                <div class="card-header">
                    <h3 class="card-title">Customer</h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-success" @click="addCustomer">Add Customer <i class="fa fa-plus" aria-hidden="true"></i> </button>
                    </div>
                </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, index) in customers.data" :key="index">
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.contact_number }}</td>
                        <td>
                            <a href="" @click.prevent="showCustomer(customer.id)" class="btn btn-success btn-sm" title="View"><i class="fa fa-eye" aria-hidden="true"></i></a>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
        <div class="col-lg-6">
            <div class="jumbotron p-3" style="box-shadow: 0px 0px 3px black;">
                <form @submit.prevent="saveCustomer" id="customerForm">
                    <div class="form-group">
                        <label for="name">Customer Name:</label>
                        <input type="text" v-model="customerForm.name" class="form-control" :readonly="showMode" :class="{ 'is-invalid': customerForm.errors.has('name') }">
                        <has-error :form="customerForm" field="name"></has-error>
                    </div>
                    <div class="form-group">
                        <label for="contact_number">Contact #</label>
                        <input type="number" v-model="customerForm.contact_number" class="form-control" :readonly="showMode" :class="{ 'is-invalid': customerForm.errors.has('contact_number') }">
                        <has-error :form="customerForm" field="contact_number"></has-error>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" v-model="customerForm.email" class="form-control" :readonly="showMode" :class="{ 'is-invalid': customerForm.errors.has('email') }">
                        <has-error :form="customerForm" field="email"></has-error>
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" v-model="customerForm.address" class="form-control" :readonly="showMode"  :class="{ 'is-invalid': customerForm.errors.has('address') }">
                        <has-error :form="customerForm" field="address" ></has-error>
                    </div>
                    <div v-if="showMode">
                        <button type="button" class="btn btn-success btn-block" @click="goEditMode"> <i class="fas fa-pencil-alt" aria-hidden="true"></i> Edit Customer</button>
                    </div>
                    <div v-else>
                        <div class="row">
                            <div class="col-md-6">
                                <button type="submit" class="btn btn-success btn-block"> <i class="fas fa-save"></i> Save</button>
                            </div>
                            <div class="col-md-6">
                                <button class="btn btn-warning btn-block" @click="showCustomer(customers.data[0].id)"> <i class="fas fa-exclamation-triangle"></i> Cancel</button>
                            </div>
                        </div>
                            <a v-show="showDelete"  href="" @click.prevent="deleteCustomer(customerForm.id)" class="btn btn-primary btn-block my-3"> <i class="fa fa-times" aria-hidden="true"></i> Delete this Customer </a>
                    </div>
                </form>
            </div>
        </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            showMode: true,
            showDelete: false,
            customerForm: new Form({
                id: '',
                name : '',
                contact_number : '',
                email : '',
                address : ''
            }),
            customers : {}
        }
    },
    methods : {
        loadCustomer(){
            axios.get('api/v1/customer').then(({data}) => {
                this.customers = data;
                this.showCustomer(data.data[0].id);
            });
        },
        saveCustomer(){
            this.customerForm.post('api/v1/customer')
                .then((data) => this.loadCustomer());
        },
        showCustomer(id){
            this.showMode = true;
            axios.get('/api/v1/customer/'+id).then(({data}) => {
                this.customerForm.fill(data);
            });
        },
        addCustomer(){
            this.showMode = false;
            this.showDelete = false;
            this.customerForm.clear();
            this.customerForm.reset();
        },
        goEditMode(){
            this.showMode = false;
            this.showDelete = true;
        },
        deleteCustomer(id){
          this.customerForm.delete('/api/v1/customer/'+id).then(({data}) => {
              this.loadCustomer();
          });
        }
    },
    created(){
        this.loadCustomer();
    }
}
</script>