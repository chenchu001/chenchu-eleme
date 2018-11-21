<template>
    <transition name="fold">
        <div class="shop-cart-list" v-show="fold">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click.stop.prevent="empty">清空</span>
            </div>
            <cube-scroll class="list-content" ref="listContent" :options="scrollOptions">
                <ul>
                    <li class="food" v-for="(food, index) in selectFoods" :key="index">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price * food.count}}</span>
                        </div>
                        <div class="cart-control-wrapper">
                            <cart-control :food="food"></cart-control>
                        </div>
                    </li>
                </ul>
            </cube-scroll>
        </div>
    </transition>
</template>

<script>
    import CartControl from 'pages/cart-control/cart-control'

    export default {
        name: 'shop-cart-list',
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return []
                }
            },
            totalCount: {
                type: Number
            },
            fold: {
                type: Boolean
            }
        },
        data () {
            return {
                visible: false,
                scrollOptions: {
                    click: false,
                    directionLockThreshold: 0
                }
            }
        },
        methods: {
            empty () {
                this.$emit('empty')
            }
        },
        components: {CartControl}
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"
    
    .shop-cart-list
        position: absolute
        top: 0
        left: 0
        z-index: -1
        width: 100%
        transition: all .5s
        transform: translate3d(0,-100%,0)
        &.fold-enter-active,&.fold-leave
            transform: translate3d(0,-100%,0)
        &.fold-enter,&.fold-leave-active
            transform: translate3d(0,0,0)
        .list-header
            height: 40px
            line-height: 40px
            padding: 0 10px
            background: #f3f5f7
            border-bottom: 1px solid rgba(7,17,27,.1)
            .title
                float: left
                font-size: 14px
                color: rgb(7,17,27)
            .empty
                float: right
                font-size: 12px
                color: rgb(0,160,220)
        .list-content
            padding: 0 18px
            max-height: 217px
            background: #fff
            overflow: hidden
            .food
                position: relative
                padding: 12px 0
                box-sizing: border-box
                border-bottom: 1px solid rgba(7,17,27,.1)
                .name
                    line-height: 24px
                    font-size: 14px
                    color: rgb(7,17,27)
                .price
                    position: absolute
                    right: 90px
                    bottom: 12px
                    line-height: 24px
                    font-size: 14px
                    font-weight: 700
                    color: rgb(240,20,20)
                .cart-control-wrapper
                    position: absolute
                    bottom: 6px
                    right: 0
</style>