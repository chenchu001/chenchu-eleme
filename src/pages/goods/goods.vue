<template>
    <div class="goods">
        <div class="scroll-nav-wrapper">
            <cube-scroll-nav
                :side="true"
                :data="goods"
                :options= "scrollOptions"
                v-if="goods.length">
                <template slot="bar" slot-scope="props">
                    <cube-scroll-nav-bar
                        direction="vertical"
                        :labels="props.labels"
                        :txts="barTxts"
                        :current="props.current">
                        <template slot-scope="props">
                            <div class="text">
                                <support-icon 
                                    v-if="props.txt.type >= 1"
                                    :size=1
                                    :type="props.txt.type">
                                </support-icon><span class="name">{{props.txt.name}}</span>
                                <span class="num" v-if="props.txt.count">
                                    <bubble :num="props.txt.count"></bubble>
                                </span>
                            </div>
                        </template>
                    </cube-scroll-nav-bar>
                </template>
                <cube-scroll-nav-panel
                    v-for="good in goods"
                    :key="good.name"
                    :label="good.name"
                    :title="good.name">
                    <ul>
                        <li v-for="food in good.foods" :key="food.name" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" alt="" />
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cart-control-wrapper">
                                    <cart-control :food="food" @add="onAdd"></cart-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <div class="shop-cart-wrapper">
            <shop-cart ref="shopCart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
        </div>
    </div>
</template>

<script>
    import ShopCart from 'pages/shop-cart/shop-cart'
    import CartControl from 'pages/cart-control/cart-control'
    import SupportIcon from 'pages/support-icon/support-icon'
    import Bubble from 'pages/bubble/bubble'
    import {getGoods} from 'api'

    export default {
        name: "goods",
        props: {
            data: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {
                goods: [],
                scrollOptions: {
                    click: false,
                    directionLockThreshold: 0
                }
            }
        },
        computed: {
            seller () {
                return this.data.seller
            },
            selectFoods () {
                let foods = []
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            },
            barTxts () {
                let ret = []
                this.goods.forEach((good) => {
                    const {type, name, foods} = good
                    let count = 0
                    foods.forEach((food) => {
                        count += food.count || 0
                    })
                    ret.push({
                        type,name,count
                    })
                })
                return ret
            }
        },
        methods: {
            fetch () {
                getGoods().then((goods) => {
                    this.goods = goods
                })
            },
            onAdd (el) {
                this.$refs.shopCart.drop(el)                
            }
        },
        components: {ShopCart, CartControl, SupportIcon, Bubble}
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"
    .text
        >>> .support-icon
            display: inline-block
            vertical-align: top
    
    .goods
        position: relative
        height: 100%
        .scroll-nav-wrapper
            position: absolute
            width: 100%
            top: 0
            left: 0
            bottom: 48px
        >>>.cube-scroll-nav-bar
            width: 80px
            white-space: normal
            overflow: hidden
        >>>.cube-scroll-nav-bar-item
            padding: 0 10px
            display: flex
            align-items: center
            text-align: left
            height: 56px
            line-height: 14px
            font-size: $fontsize-small
            background: $color-background-ssss
            &.cube-scroll-nav-bar-item_active
                background: #fff
                color: #000
            .text
                flex: 1
                position: relative
            .num
                position: absolute
                right: -8px
                top: -10px
            .support-ico
                display: inline-block
                vertical-align: top
        >>>.cube-scroll-nav-panel-title
            padding-left: 14px
            height: 26px
            line-height: 26px
            border-left: 2px solid #d9dde1
            font-size: 12px
            color: #93999f
            background: #f3f5f7
        .food-item
            display: flex
            margin: 18px
            position: relative
            padding-bottom: 10px
            box-sizing: border-box
            border-bottom: 1px solid rgba(7,17,27,.1)
            &:last-child
                border-bottom: none
            .icon
                flex: 0 0 57px
                margin-right: 10px
            .content
                flex: 1
                .name
                    margin: 2px 0 8px 0
                    height: 14px
                    line-height: 14px
                    font-size: 14px
                    color: rgb(7,17,27)
                .desc, .extra
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147,153,159)
                .desc
                    margin-bottom: 8px
                    line-height: 12px
                .extra
                    .count
                        margin-right: 12px
                .price
                    font-weight: 700
                    line-height: 24px
                    .now
                        margin-right: 8px
                        font-size: 14px
                        color: rgb(240,20,20)
                    .old
                        text-decoration: line-through
                        font-size: 10px
                        color: rgb(147,153,159)
                .cart-control-wrapper
                    position: absolute
                    right: 0
                    bottom: 0
</style>