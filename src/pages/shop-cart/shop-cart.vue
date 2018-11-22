<template>
    <div class="shop-cart" @click="toggleList">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
                    </div>
                    <!-- 选择多少个商品 -->
                    <div class="num" v-show="totalCount>0">
                        <bubble :num="totalCount"></bubble>
                    </div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
        <!-- 小球 -->
        <div class="ball-container">
            <div v-for="(ball, index) in balls" :key="index">
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Bubble from 'pages/bubble/bubble'
    import ShopCartList from 'pages/shop-cart-list/shop-cart-list'

    const BALL_LEN = 5

    function createBalls () {
        let ret = []
        for (let i=0;i<BALL_LEN;i++) {
            ret.push({
                show: false
            })
        }
        return ret
    }

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
        data () {
            return {
                balls: createBalls()
            }
        },
        methods: {
            drop (el) {
                for (let i=0;i<this.balls.length;i++) {
                    const ball = this.balls[i]
                    if (!ball.show) {
                        ball.show = true
                        ball.el = el
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            beforeEnter (el) {
                const ball = this.dropBalls[this.dropBalls.length - 1]
                const rect = ball.el.getBoundingClientRect()
                const x = rect.left - 32
                const y = -(window.innerHeight - rect.top - 22)
                el.style.display = ''
                el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
            },
            enter (el, done) {
                // 页面触发重绘
                let rf = el.offsetHeight
                el.style.transform = el.style.webkitTransform = `translate3d(0, 0, 0)`
                const inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.transform = inner.style.webkitTransform = `translate3d(0, 0, 0)`
                el.addEventListener('transitionend',done)
            },
            afterEnter (el) {
                const ball = this.dropBalls.shift()
                if (ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
            },
            toggleList () {
                if (this.listFold) {
                    if (!this.totalCount) {
                        return
                    }
                    this.listFold = false
                    this._showShopCartList()
                } else {
                    this.listFold = true
                    this._hideShopCartList()
                }
            },
            empty () {
                let that = this
                this.$createDialog({
                    type: 'confirm',
                    title: '确认清空购物车',
                    confirmBtn: {
                        text: '确定',
                        active: true,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    cancelBtn: {
                        text: '取消',
                        active: false,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    onConfirm: () => {
                        that.selectFoods.forEach((food) => {
                            food.count = 0
                        })
                    },
                    onCancel: () => {
                        
                    }
                }).show()
            },
            pay () {
                alert('支付')
            },
            _showShopCartList () {
                this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
                    $props: {
                        selectFoods: "selectFoods"
                    },
                    $events: {
                        hide: () => {
                            this.listFold = true
                        }
                    }
                })
                this.shopCartListComp.show()
            },
            _hideShopCartList () {
                this.shopCartListComp.hide()
            }
        },
        created () {
            this.dropBalls = []
            // 默认状态是收起
            this.listFold = true
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
                if(this.totalPrice === 0){
                    return '￥'+this.minPrice+'元起送';
                }else if(this.totalPrice < this.minPrice){
                    let diff = this.minPrice - this.totalPrice;
                    return '还差￥'+diff+'元起送';
                }else{
                    return '去结算';
                }
            },
            payClass () {
                if(this.totalPrice < this.minPrice){
                    return 'not-enough';
                }else{
                    return 'enough';
                }
            }
        },
        components: {Bubble, ShopCartList}
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
                        top: 4px
                        right: 4px
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
        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                transition: all .4s cubic-bezier(.49, -.29, .75, .41)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: $color-blue
                    transition: all .4s linear
    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 40
        background: rgba(7,17,27,0.6)
        backdrop-filter: blur(10px)
        transition: all .3s
        &.list-mask-enter-active,&.list-mask-leave
            opacity: 1
            background: rgba(7,17,27,0.6)
        &.list-mask-enter,&.list-mask-leave-active
            opacity: 0
            background: rgba(7,17,27,0)
</style>