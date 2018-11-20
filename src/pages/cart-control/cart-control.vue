<template>
    <div class="cart-control">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0" @click.stop="decrease">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="add"></div>
    </div>
</template>

<script>
    export default {
        name: 'cart-control',
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            add () {
                if (!this.food.count) {
                    this.$set(this.food, 'count', 1)
                } else {
                    this.food.count++
                }
            },
            decrease () {
                if (this.food.count) {
                    this.food.count--
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/mixin"
    @import "~common/stylus/variable"
    
    .cart-control
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            transition: all 0.4s linear
            .inner
                display:inline-block
                line-height: 24px
                font-size: 24px
                color: rgb(0,160,220)
                transition: all 0.4s linear
                transform: rotate(0) 
            &.move-enter-active,&.move-leave
                opacity: 1
                transform: translate3D(0,0,0)
            &.move-enter,&.move-leave-active
                opacity: 0
                transform: translate3D(24px,0,0)
                .inner
                    transform: rotate(180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147,153,159)
        .cart-add
            display: inline-block
            line-height: 24px
            font-size: 24px
            padding: 6px
            color: rgb(0,160,220)
</style>