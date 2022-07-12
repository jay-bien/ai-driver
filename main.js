const canvas = document.querySelector("#mainCanvas");
const networkCanvas = document.querySelector("#networkCanvas");


canvas.height = window.innerHeight;
canvas.width = 300;
networkCanvas.height = window.innerHeight;
networkCanvas.width = 400;


const ctx = canvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
networkCtx.setLineDash([ 40, 50, 50, 30])
const road = new Road( canvas.width / 2, canvas.width * 0.7);
// const car = new Car( road.getLaneCenter(0), 100, 30, 50);


let car = new Car( road.getLaneCenter( 1 ), 100, 30, 50, 5, "AI");
let cars = generateCars( 100 );
let bestDriver = cars[ 0 ];

if( localStorage.getItem("bestDriver")){
    for( let i = 0; i < cars.length; i++){
        cars[ i ].brain = JSON.parse(
            localStorage.getItem("bestDriver")
        )
        if( i !== 0){
            NeuralNetwork.mutate(
                cars[i ].brain, .15
            )
        }
    }
    bestDriver.brain = JSON.parse(
        localStorage.getItem("bestDriver")
    )
}

const traffic = [
    new Car( road.getLaneCenter( 1 ), -100, 30, 110, 5),
    new Car( road.getLaneCenter( 0 ), -300, 30, 110, 5),
    new Car( road.getLaneCenter( 2 ), -300, 30, 100, 5),
];
 

// console.log({ traffic },{car},{car2});

 
function generateCars( n ){
    const cars = [];
    for( let i = 0; i < n; i++){
        cars.push( new Car( road.getLaneCenter( 1 ), 100, 30, 50,10 , "AI"))
    }

    return cars;
}

animate(  );

function save(){
    localStorage.setItem("bestDriver",
        JSON.stringify( bestDriver.brain )
    )
}

function discardSave(){
    localStorage.removeItem("bestDriver");
}

function animate( time ){


    for( let i = 0; i < traffic.length; i++){
        traffic[i].update( canvas, road.borders, [] );
    }
    for( let i = 0; i < cars.length; i++){
        cars[ i ].update( canvas, road.borders, traffic );
    }
    car.update( canvas, road.borders, traffic );

    bestDriver = cars.find(
        c => c.y == Math.min(
            ...cars.map(c=>c.y)
        )
    )
    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(0,-bestDriver.y+canvas.height*0.7);

    road.draw( ctx );
    ctx.globalAlpha = .3;
    for( let i = 0; i < cars.length; i++){
        cars[ i ].draw( ctx );
    }
    ctx.globalAlpha = 1;
    bestDriver.draw( ctx, "gold", true );
    for( let i = 0; i < traffic.length; i++){
        traffic[i].draw( ctx );
    }


    ctx.restore();
    Visualizer.drawNetwork( networkCtx, bestDriver.brain )
    
    networkCtx.lineDashOffset = -time/60;
    requestAnimationFrame( animate)
}