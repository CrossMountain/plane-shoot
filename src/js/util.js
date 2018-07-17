/**
 *  检查两个矩形是否碰撞
 * @param  {Object} obj1     obj1应该有x、y、width、height
 * @param  {[type]} obj2     [description]
 * @param  {Number} distance 判断碰撞的最小距离
 * @return {Boolean}          true 或者false
 */
function checkRectCollision(obj1, obj2, distance) {
    if (obj1.y < obj2.y) { //1在上
        return checkRectVerticalCollision(obj1, obj2, distance)
    } else if (obj1.y >= obj2.y) { //1在下
        return checkRectVerticalCollision(obj2, obj1, distance)
    } else if (obj1.x < obj2.x) { //1在左
        return checkRectHorizontal(obj1, obj2, distance)
    } else if (obj1.x >= obj2.x) { //1 在右
        return checkRectHorizontal(obj2, obj1, distance)
    } else {
        return false
    }
}

//竖直碰撞检测,ob1在上，obj2在下
function checkRectVerticalCollision(obj1, obj2, distance) {
    if ((obj1.y + obj1.height) >= obj2.y) return false //不满足1上2下
    if ((obj2.x + obj2.width + 5) < obj1.x) return false //没有横向交集，1右2左
    if ((obj1.x + obj1.width + 5) < obj2.x) return false //没有横向交集，1左2右  

    if ((obj2.y - obj1.y - obj1.height) <= distance) return true
}

//水平碰撞检测，obj1在左，obj2在右
function checkRectHorizontal(obj1, obj2, distance) {
    if ((obj1.x + obj1.width) >= obj2.x) return false //不满足1左2右
    if ((obj2.y + obj2.height + 5) < obj1.y) return false //没有纵向交集：1下2上
    if ((obj1.y + obj1.height + 5) < obj2.y) return false //没有纵向交集：1上2下  

    if ((obj2.x - obj1.x - obj1.width) <= distance) return true
}

function resourceOnload(resources, callback) {
    var total = resources.length
    var finish = 0
    var images = []

    resources.forEach((item, index) => {
        images[index] = new Image()
        images[index].src = item

        images[index].onload = () => {
            finish++
            if (finish === total) {
                callback(images)
            }
        }

    })

}

export const util = {
    checkRectCollision,
    resourceOnload,
}