var canvas = document.getElementById("background-lines");
var ctx = canvas.getContext("2d");
let lines;

generateLines();

window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

function generateLines() {
    lines = new Array(100).fill().map(() => {
        return {
            x: Math.round(Math.random() * window.innerWidth), y: Math.round(Math.random() * window.innerHeight), s: Math.random() < 0.5 ? Math.random() * -0.5 : Math.random() * 0.5 , l: Math.random() * (30 - 20) + 20
        }
    });
}

function moveLine(line) {
    line.x += line.s;
    line.y += line.s;

    if (line.x < 0 || line.y < 0 || line.y > canvas.height + line.l || line.x > canvas.width + line.l) {
        line.s = line.s * -1;
    }
}

function drawLine(line) {
    ctx.beginPath();
    ctx.strokeStyle = "#e9e9e9";
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x + line.l, line.y + line.l);
    ctx.stroke();
}

function loop() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // clear old frame;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(line => {
        moveLine(line);
        drawLine(line);
    });
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);