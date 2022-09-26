<template>
<body>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <div class="col-12">
                    <select class="form-select">
                        <option selected>Open this select menu</option>
                        <option value="1">Laptop</option>
                        <option value="2">monitor</option>
                        <option value="3">mouse/keyboard</option>
                      </select>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(product,i) in productList" >
                    <div class="card" style="width: 18rem;">
                        <a @click="goToDetail(product.id);" style="cursor:pointer;"><img :src="product.path" class="card-img-top" alt="..."></a>
                        <div class="card-body">
                          <h5 class="card-title">{{product.product_name}}</h5>
                          <p class="card-text">
                            <span class="badge bg-dark mr-1">Home Appliances</span>
                            <span class="badge bg-dark">Computer</span>
                            <span class="badge bg-dark">Accessary</span>
                          </p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Buy now</button>
                            </div>
                            <small class="text-dark">$19.99</small>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </main>
</body>
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
          this.productList = await this.$api("/api/productList",{});
          console.log(this.productList);
        },
        goToDetail(product_id) {
            this.$router.push({path:'/detail', query:{product_id:product_id}}); 
        }
      }
    }
</script>
