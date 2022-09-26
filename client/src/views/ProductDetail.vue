<template>
    <main class="mt-3">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="true">
                        <div class="carousel-indicators">
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div :class="`carousel-item ${i==0?'active':''}`" :key="i" v-for="(pimg, i) in productImage">
                                <img :src="pimg.path" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                          <span class="carousel-control-next-icon" aria-hidden="true"></span>
                          <span class="visually-hidden">Next</span>
                        </button>
                      </div>
                </div>
                <div class="col-md-7">
                    <div class="card shadow-sm">
                        <div class="card-body">
                          <h5 class="card-title">{{productDetail.product_name}}</h5>
                          <h5 class="card-title pt-3 pb-3 border-top">${{productDetail.product_price}}</h5>
                          <p class="card-text pt-3 border-top">
                            <span class="badge bg-dark me-2">{{productDetail.category1}}</span>
                            <span class="badge bg-dark me-2">{{productDetail.category2}}</span>
                            <span class="badge bg-dark me-2">{{productDetail.category3}}</span>
                          </p>
                          <p class="card-text pb-3">
                            shipping ${{productDetail.delivery_price}} | Deliver within {{productDetail.outbound_days}} days(business days)
                          </p>
                          <div class="card-text border-top pb-3">
                            <div class="row">
                                <div class="col-auto">
                                    <label for="" class="col-form-label">Quantity</label>
                                </div>
                                <div class="col-auto">
                                    <div class="input-group">
                                        <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(-1);">-</span>
                                        <input type="text" class="form-control" style="width:40px;" v-model="total">
                                        <span class="input-group-text" style="cursor:pointer;" @click="calculatePrice(1);">+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div class="row pt-3 pb-3 border-top">
                            <div class="col-6">
                                <h3>Total Price</h3>
                            </div>
                            <div class="col-6" style="text-align: right;">
                                <h3>${{getCurrencyFormat(totalPrice)}}</h3>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="col-6 d-grid p-1">
                                <button type="button" class="btn btn-lg btn-dark">Add to Cart</button>
                            </div>
                            <div class="col-6 d-grid p-1">
                                <button type="button" class="btn btn-lg btn-danger">Buy now</button>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <img :src="productDetail.path" class="img-fluid" alt="swag">
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
          productDetail: {},
          productImage: [],
          total: 1,
          totalPrice: 0
        };
      },
      created() {
        this.productId = this.$route.query.product_id;
        this.getProductDetail();
        this.getProductImage();
      },
      methods: {
        calculatePrice(cnt) {
            let total =this.total + cnt;
            if (total <1) total = 1;
            this.total = total;
            this.totalPrice = this.productDetail.product_price * this.total;
        },
        getCurrencyFormat(value) {
            return this.$currencyFormat(value);
        },
        async getProductDetail() {
            let productDetail = await this.$api("/api/productDetail",{param:[this.productId]});
            if(productDetail.length > 0) {
                this.productDetail = productDetail[0];
                this.totalPrice = this.productDetail.product_price * this.total;    
            }
            console.log(this.productDetail);
        },
        async getProductImage() {
          this.productImage = await this.$api("/api/productMainImages",{param:[this.productId]});
          console.log('this.productImage',this.productImage)
        }
      }
    }
    </script>
  