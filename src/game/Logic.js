function getRectangleCollision(o1, o2) {
    if(o1.x <= o2.x + o2.width &&
        o1.x + o1.width >= o2.x &&
        o1.y <= o2.y + o2.radius &&
        o1.y + o1.width >= o2.y) {
            return true;
        }
    return false;
}