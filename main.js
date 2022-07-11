const canvas = document.querySelector("#mainCanvas");
const networkCanvas = document.querySelector("#networkCanvas");


canvas.height = window.innerHeight;
canvas.width = 300;
networkCanvas.height = window.innerHeight;
networkCanvas.width = 400;

const ctx = canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road( canvas.width / 2, canvas.width * 0.7);
// const car = new Car( road.getLaneCenter(0), 100, 30, 50);


let car = new Car( road.getLaneCenter( 1 ), 100, 30, 50, 5, "AI");


const traffic = [
    new Car( road.getLaneCenter( 1 ), 20, 30, 110, 5),
    new Car( road.getLaneCenter( 0 ), 10, 30, 110, 5),
    new Car( road.getLaneCenter( 2 ), 800, 30, 100, 5),
];
 

// console.log({ traffic },{car},{car2});


animate(  );

function animate(  ){


    for( let i = 0; i < traffic.length; i++){
        traffic[i].update( canvas, road.borders, [] );
    }
    car.update( canvas, road.borders, traffic );

    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw( ctx );
    car.draw( ctx );
    for( let i = 0; i < traffic.length; i++){
        traffic[i].draw( ctx );
    }


    ctx.restore();
    Visualizer.drawNetwork( networkCtx, car.brain )

    requestAnimationFrame( animate)
}