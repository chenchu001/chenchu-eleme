// 阻止下拉
function touchmove () {
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault()
    }, {passive: false})
}
// 允许下拉
function untouchmove () {
    document.body.addEventListener('touchmove', function (e) {
        window.event.returnValue = true
    })
}
export {touchmove, untouchmove}
