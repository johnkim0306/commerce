<template>
    <main class="mt-3">
      <div class="container">
        <h2 class="text-center">Edit Product</h2>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">Product Name</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="productDetail.product_name">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">Product Price</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="productDetail.product_price">
              <span class="input-group-text">Dollar</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">Delivery Price</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="productDetail.delivery_price">
              <span class="input-group-text">Dollar</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">Additional Price</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="productDetail.add_delivery_price">
              <span class="input-group-text">Dollar</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">Product Category</label>
          <div class="col-md-9">
            <div class="row">
              <div class="col-auto">
                <select class="form-select">
                  <option>Home Appliances</option>
                </select>
              </div>
              <div class="col-auto">
                <select class="form-select">
                  <option>Computer</option>
                </select>
              </div>
              <div class="col-auto">
                <select class="form-select">
                  <option>Accessary</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">Tag</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="productDetail.tags">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="col-md-3 col-form-label">Delivery Date</label>
          <div class="col-md-9">
            <div class="input-group mb-3">
              <input type="number" class="form-control" v-model="productDetail.outbound_days">
              <span class="input-group-text">Business Date</span>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-dark" @click="goToList">Cancel</button>
          </div>
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-danger">Save</button>
          </div>
        </div>
      </div>
    </main>
  </template>
  <script>
  export default {
    data() {
      return {
        productId: 0,
        productDetail: {}
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted() {
      if(this.user.email == undefined) {
        alert("Please log in");
        this.$router.push({path:'/'}); 
      }
    },
    created() {
      this.productId = this.$route.query.product_id;
      this.getProductDetail();
    },
    methods: {
      goToList(){
        this.$router.push({path:'/sales'}); 
      },
      async getProductDetail() {
        let productDetail = await this.$api("/api/productDetail",{param:[this.productId]});
        if(productDetail.length > 0) {
          this.productDetail = productDetail[0];
        }
      }
    }
  }
  </script>