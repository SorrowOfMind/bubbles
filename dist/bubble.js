var Canvas = /** @class */ (function () {
    function Canvas(cvs, width, height) {
        this.cvs = cvs;
        this.ctx = cvs.getContext('2d');
        this.cvs.width = width;
        this.cvs.height = height;
    }
    return Canvas;
}());
var Bubble = /** @class */ (function () {
    function Bubble(color, speed) {
        this.radiusMin = 20;
        this.radiusMax = 150;
        this.color = color;
        this.velY = this.randomizeValue(0.001, 0.002) + speed;
        this.velX = this.randomizeValue(-2, 4);
        this.isAlive = true;
        this.radius = this.randomizeValue(this.radiusMin, this.radiusMax);
        this.velRadius = 0;
        this.coords = {
            x: this.randomizeValue(0, window.innerWidth),
            y: this.randomizeValue(window.innerHeight + this.radius, 50)
        };
    }
    Bubble.prototype.randomizeValue = function (min, max) {
        return (Math.random() * (max - min)) + min;
    };
    return Bubble;
}());
var BubbleHandler = {
    bubbles: [],
    bubblesBg: [],
    addBubble: function (bubble, bubbleType) {
        if (bubbleType === void 0) { bubbleType = 'bubble'; }
        if (bubbleType === 'bubble') {
            this.bubbles.push(bubble);
        }
        else {
            this.bubblesBg.push(bubble);
        }
    }
};
var cvsBg = new Canvas(document.getElementById('bg'), window.innerWidth, window.innerHeight);
var cvs = new Canvas(document.getElementById('cvs'), window.innerWidth, window.innerHeight);
