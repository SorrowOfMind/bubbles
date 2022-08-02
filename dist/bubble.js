var Canvas = /** @class */ (function () {
    function Canvas(cvs, width, height) {
        this.cvs = cvs;
        this.ctx = cvs.getContext('2d');
        this.cvs.width = width;
        this.cvs.height = height;
    }
    return Canvas;
}());
var cvsBg = new Canvas(document.getElementById('bg'), window.innerWidth, window.innerHeight);
var cvs = new Canvas(document.getElementById('cvs'), window.innerWidth, window.innerHeight);
