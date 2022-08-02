interface CanvasInterface {
    cvs: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

interface CanvasContructor {
    new (cvs: HTMLCanvasElement, width: number, height: number): CanvasInterface;
}

interface BubbleInterface {
    color: string;
    velY: number;
    velX: number;
    isAlive: boolean;
    coords: Coords;
    update(): void;
    draw(ctx: CanvasRenderingContext2D): void;
}

interface BubbleHandlerInterface {
    bubbles: (Bubble | null)[];
    bubblesBg: (Bubble | null)[];
    addBubble(bubble: Bubble, bubbleType: string): void;
    handleBubbles(): void;
}

type Coords = {
    x: number,
    y: number
}

const Canvas: CanvasContructor = class Canvas implements CanvasInterface {
    public cvs: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    
    constructor(cvs: HTMLCanvasElement, width: number, height: number) {
        this.cvs = cvs;
        this.ctx = cvs.getContext('2d');
        this.cvs.width = width;
        this.cvs.height = height;
    }
}

class Bubble implements BubbleInterface {
    public color: string;
    public velY: number;
    public velX: number;
    public isAlive: boolean;
    public coords: Coords;

    private radius: number;
    private velRadius: number; //how fast will it shrink

    private readonly radiusMin = 40; 
    private readonly radiusMax = 150; 

    constructor(color: string, speed: number) {
        this.color = color;

        this.velY = this.randomizeValue(0.001, 0.0012) + speed;
        this.velX = this.randomizeValue(-2, 2);

        this.isAlive = true;

        this.radius = this.randomizeValue(this.radiusMin, this.radiusMax);
        this.velRadius = 0;

        this.coords = {
            x: this.randomizeValue(0, window.innerWidth),
            y: this.randomizeValue(window.innerHeight + this.radius, window.innerHeight + this.radius - 40)
        }

    }

    randomizeValue(min: number, max: number) {
        return (Math.random() * (max - min)) + min;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.coords.x, this.coords.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
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
    }
}

const BubbleHandler: BubbleHandlerInterface = {
    bubbles: [],
    bubblesBg: [],

    addBubble(bubble: Bubble, bubbleType = 'bubble') {
        if (bubbleType === 'bubble') {
            this.bubbles.push(bubble);
        } else {
            this.bubblesBg.push(bubble);
        }
    },

    handleBubbles() {
        for(let i = this.bubbles.length - 1; i >= 0; i--) {
            this.bubbles[i].update();
            if (!this.bubbles[i].isAlive) {
                this.bubbles.splice(i, 1);
            }
        }
        for(let i = this.bubblesBg.length - 1; i >= 0; i--) {
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
}


let cvsBg = new Canvas(document.getElementById('bg') as HTMLCanvasElement, window.innerWidth, window.innerHeight);
let cvs = new Canvas(document.getElementById('cvs') as HTMLCanvasElement,  window.innerWidth, window.innerHeight);

function animate() {
    cvs.ctx.clearRect(0, 0, cvs.cvs.width, cvs.cvs.height);
    cvsBg.ctx.clearRect(0, 0, cvs.cvs.width, cvs.cvs.height);

    BubbleHandler.handleBubbles();

    for(let i = BubbleHandler.bubbles.length - 1; i >= 0; i--) {
        BubbleHandler.bubbles[i].draw(cvs.ctx);
    }

    for(let i = BubbleHandler.bubblesBg.length - 1; i >= 0; i--) {
        BubbleHandler.bubblesBg[i].draw(cvsBg.ctx);
    }
    
    requestAnimationFrame(animate);
}

window.addEventListener('load', animate);

window.addEventListener('resize', function() {
    cvs.cvs.width = this.innerWidth;
    cvs.cvs.height = this.innerHeight;
    cvsBg.cvs.width = this.innerWidth;
    cvsBg.cvs.height = this.innerHeight;

    BubbleHandler.bubbles = [];
    BubbleHandler.bubblesBg = [];
});

