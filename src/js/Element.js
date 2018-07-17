class Element {
    constructor(obj = {}) {
        this.x = obj.x
        this.y = obj.y
    }
    moveElement(deltaX, deltaY) {
        this.x += deltaX
        this.y += deltaY
    }
}

export default Element