const canvas = document.getElementById('canvas1'); // target canvas element
const ctx = canvas.getContext('2d');// access to built in objects & drawing methods
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//ctx.globalCompositeOperation = "xor"//how the shapes interact with each other

const edge = 40; // deternines the radius around the circle in which particles are randomly allowed to move
let drawing = false;//to draw only when clicking the mouse

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
}) 
// every time user moves mouse. extract coordinates from the info in event

class Root {//creating a kind of object
    constructor(x, y, color, centerX, centerY){
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;//how many pixels for each frame of animation
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw(){//calculate particle current position and draw it on canvas
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;//particles move randomly LR, UD
        this.x += this.speedX;
        this.y += this.speedY;

        //calculate current distance of particle from center point
        const distanceX = this.x - this.centerX; 
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);//hypotenuse of distanceX & distanceY
        const radius = (-distance / edge + 1) * edge / 10;//calculate size of particle

        if (radius > 0) {//if the particle hasn't reached the edge of the area in which it is allowed to move
            requestAnimationFrame(this.draw.bind(this));//can call this outside of the scope
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);//drawing a circle
            ctx. fillStyle = this.color;
            ctx.fill(); 
            ctx.strokeStyle = 'magenta';
            ctx.stroke();//put a ^^^ border around each particle
        }
    }
} 

function branchOut(){
    if (drawing) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < 3; i++){//how many roots are growing out from each centerpoint
            const root = new Root(mouse.x, mouse.y, 'blue', centerX, centerY);//calls class constructor, & creates one new instance of object based on template created in particle class
            //^^^x, y, color, centerX, centerY
            root.draw();
        }
    }
}

window.addEventListener('resize', function(){//prevent stretching when user resizes window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function(){//mousetrail--old particles disappear slowly and then clear 
    // ctx.fillStyle = 'rgba(0,0,255,0.03)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
});

window.addEventListener('mousedown', function(){
    drawing = true;
});

window.addEventListener('mouseup', function(){
    drawing = false;
});