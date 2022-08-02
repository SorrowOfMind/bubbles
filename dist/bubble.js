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
        this.radiusMin = 40;
        this.radiusMax = 150;
        this.color = color;
        this.velY = this.randomizeValue(0.001, 0.0012) + speed;
        this.velX = this.randomizeValue(-2, 2);
        this.isAlive = true;
        this.radius = this.randomizeValue(this.radiusMin, this.radiusMax);
        this.velRadius = 0;
        this.coords = {
            x: this.randomizeValue(0, window.innerWidth),
            y: this.randomizeValue(window.innerHeight + this.radius, window.innerHeight + this.radius - 40)
        };
    }
    Bubble.prototype.randomizeValue = function (min, max) {
        return (Math.random() * (max - min)) + min;
    };
    Bubble.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.coords.x, this.coords.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    Bubble.prototype.update = function () {
        // console.log('update', this.velY)
        this.velY += 0.00001;
        this.velRadius += 0.02;
        this.coords.x += this.velX;
        this.coords.y -= this.velY;
        if (this.radius > 1) {
            this.radius -= this.velRadius;
        }
        if (this.radius <= 1) {
            this.isAlive = false;
        }
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
    },
    handleBubbles: function () {
        for (var i = this.bubbles.length - 1; i >= 0; i--) {
            this.bubbles[i].update();
            if (!this.bubbles[i].isAlive) {
                this.bubbles.splice(i, 1);
            }
        }
        for (var i = this.bubblesBg.length - 1; i >= 0; i--) {
            this.bubblesBg[i].update();
            if (!this.bubblesBg[i].isAlive) {
                this.bubblesBg.splice(i, 1);
            }
        }
        if (this.bubbles.length < window.innerWidth / 4) {
            this.addBubble(new Bubble('rgba(249, 248, 113, 1)', 1.8));
        }
        if (this.bubblesBg.length < window.innerWidth / 12) {
            this.addBubble(new Bubble('rgba(227,176,225,1)', 4.5), 'bg');
        }
    }
};
var cvsBg = new Canvas(document.getElementById('bg'), window.innerWidth, window.innerHeight);
var cvs = new Canvas(document.getElementById('cvs'), window.innerWidth, window.innerHeight);
function animate() {
    cvs.ctx.clearRect(0, 0, cvs.cvs.width, cvs.cvs.height);
    cvsBg.ctx.clearRect(0, 0, cvs.cvs.width, cvs.cvs.height);
    BubbleHandler.handleBubbles();
    for (var i = BubbleHandler.bubbles.length - 1; i >= 0; i--) {
        BubbleHandler.bubbles[i].draw(cvs.ctx);
    }
    for (var i = BubbleHandler.bubblesBg.length - 1; i >= 0; i--) {
        BubbleHandler.bubblesBg[i].draw(cvsBg.ctx);
    }
    requestAnimationFrame(animate);
}
window.addEventListener('load', animate);
window.addEventListener('resize', function () {
    cvs.cvs.width = this.innerWidth;
    cvs.cvs.height = this.innerHeight;
    cvsBg.cvs.width = this.innerWidth;
    cvsBg.cvs.height = this.innerHeight;
    BubbleHandler.bubbles = [];
    BubbleHandler.bubblesBg = [];
});
