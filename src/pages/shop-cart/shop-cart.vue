<template>
    <div class="shop-cart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
                    </div>
                    <!-- 选择多少个商品 -->
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: "shop-cart",
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return []
                }
            },
            deliveryPrice:{
                type:Number,
                default:0
            },
            minPrice:{
                type:Number,
                default:0
            },
        },
        computed: {
            totalPrice () {
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                })
                return total
            },
            totalCount () {
                let count = 0
                this.selectFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            payDesc () {

            },
            payClass () {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"
    
    .shop-cart
        position: absolute
        left: 0
        bottom: 0
        z-index: 50
        width: 100%
        height: 48px
        background: #000
        .content
            display: flex
            background: #141d27
            font-size: 0
            .content-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    top: -10px
                    margin: 0 12px
                    padding: 6px
                    width: 56px
                    height: 56px
                    box-sizing: border-box
                    vertical-align: top;
                    border-radius: 50%;
                    background:#141d27
                    .logo
                        background: #2b343c
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        text-align: center
                        &.highlight
                            background: rgb(0,160,220)
                        .icon-shopping_cart
                            line-height: 44px
                            font-size: 24px
                            color: #80858a
                            &.highlight
                                color: #fff
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-size: 9px
                        font-weight: 400
                        color: #fff
                        background: rgb(240,20,20)
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display: inline-block
                    vertical-align: top
                    margin-top: 12px
                    line-height: 24px
                    padding-right: 12px
                    box-sizing: border-box
                    border-right: 1px solid rgba(255,255,255,0.1)
                    font-size: 16px
                    font-weight: 700
                    color: rgba(255,255,255,0.4)
                    &.highlight
                        color: #fff
                .desc
                    display: inline-block
                    vertical-align: top
                    line-height: 24px
                    margin:12px 0 0 12px
                    color: rgba(255,255,255,0.4)
                    font-size: 10px
            .content-right
                flex: 0 0 105px
                width: 105px
                .pay
                    height: 48px
                    line-height: 48px
                    text-align: center
                    font-size: 12px
                    color: rgba(255,255,255,0.4)
                    font-weight: 700
                    &.not-enough
                        background: #2b333b
                    &.enough
                        background: #00b43c
                        color: #fff
</style>