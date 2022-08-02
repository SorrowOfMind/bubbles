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
}

interface BubbleHandlerInterface {
    bubbles: [];
    bubblesBg: [];
    addBubble(bubble: Bubble, bubbleType: string): void;
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

class Bubble {
    public color: string;
    public velY: number;
    public velX: number;
    public isAlive: boolean;
    public coords: Coords;

    private radius: number;
    private velRadius: number; //how fast will it shrink

    private readonly radiusMin = 20; 
    private readonly radiusMax = 150; 

    constructor(color: string, speed: number) {
        this.color = color;

        this.velY = this.randomizeValue(0.001, 0.002) + speed;
        this.velX = this.randomizeValue(-2, 4);

        this.isAlive = true;

        this.radius = this.randomizeValue(this.radiusMin, this.radiusMax);
        this.velRadius = 0;

        this.coords = {
            x: this.randomizeValue(0, window.innerWidth),
            y: this.randomizeValue(window.innerHeight + this.radius, 50)
        }

    }

    randomizeValue(min: number, max: number) {
        return (Math.random() * (max - min)) + min;
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
    }
}


let cvsBg = new Canvas(document.getElementById('bg') as HTMLCanvasElement, window.innerWidth, window.innerHeight);
let cvs = new Canvas(document.getElementById('cvs') as HTMLCanvasElement,  window.innerWidth, window.innerHeight);
