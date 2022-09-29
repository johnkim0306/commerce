<template>
    <main class="mt-3">
      <div class="container">
        <div class="float-end mb-2">
          <button type="button" class="btn btn-dark" @click="goToInsert">Add Product</button>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Delivery Price</th>
              <th>Additional Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(product, i) in productList"> 
              <td>
                <img v-if="product.path!=null" :src="product.path" style="height:50px;width:auto;" />
              </td>
              <td>{{product.product_name}}</td>
              <td>{{product.product_price}}</td>
              <td>{{product.delivery_price}}</td>
              <td>{{product.add_delivery_price}}</td>
              <td>
                <button type="button" class="btn btn-info me-1" @click="goToImageInsert(product.id);">Upload Photo</button>
                <button type="button" class="btn btn-warning me-1" @click="goToUpdate(product.id);">Edit</button>
                <button type="button" class="btn btn-danger" @click="deleteProduct(product.id);">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        productList: []
      };
    },
    created() {
      this.getProductList();
    },
    methods: {
      async getProductList() {
        this.productList = await this.$api("/api/productList2",{});
        console.log(this.productList);
      },
      goToInsert() {
        this.$router.push({path:'/create'});
      },
      goToDetail(product_id) {
       this.$router.push({path:'/detail', query:{product_id:product_id}}); 
      },
      goToUpdate(product_id) {
        this.$router.push({path:'/update', query:{product_id:product_id}}); 
      },
      goToImageInsert(product_id) {
        this.$router.push({path:'/image_insert', query:{product_id:product_id}}); 
      },
      deleteProduct(product_id) {
        this.$swal.fire({
          title: 'Are you sure you want to delete this?',
          showCancelButton: true,
          confirmButtonText: `Delete`,
          cancelButtonText: `Cancel`
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log(product_id)
            await this.$api("/api/productDelete",{param:[product_id]});
            this.getProductList();
            this.$swal.fire('Deleted!', '', 'success')
          } 
        });
      }
    }
  }
  </script>