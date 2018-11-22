import {createAPI} from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'pages/header-detail/header-detail'
import ShopCartList from 'pages/shop-cart-list/shop-cart-list'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)