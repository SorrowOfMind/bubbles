interface CanvasInterface {
    cvs: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}

interface CanvasContructor {
    new (cvs: HTMLCanvasElement, width: number, height: number): CanvasInterface;
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


let cvsBg = new Canvas(document.getElementById('bg') as HTMLCanvasElement, window.innerWidth, window.innerHeight);
let cvs = new Canvas(document.getElementById('cvs') as HTMLCanvasElement,  window.innerWidth, window.innerHeight);
