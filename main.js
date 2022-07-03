const canvas = document.querySelector("#mainCanvas");


canvas.height = window.innerHeight;
canvas.width = 300;

const ctx = canvas.getContext("2d");
console.warn({ Car });


console.log({ Road });
const road = new Road( canvas.width / 2, canvas.width * 0.7);
// const car = new Car( road.getLaneCenter(0), 100, 30, 50);


let car = new Car( road.getLaneCenter( 1 ), 100, 5, 50, 5, "KEYS");


const traffic = [
    new Car( road.getLaneCenter( 1 ), 20, 20, 110, 2),
    new Car( road.getLaneCenter( 0 ), 10, 20, 110, 2),
    new Car( road.getLaneCenter( 2 ), 800, 30, 30, 2),
];


// console.log({ traffic },{car},{car2});


animate(  );

function animate(  ){


    car.update( canvas, road.borders, traffic );
    for( let i = 0; i < traffic.length; i++){
        traffic[i].update( canvas, road.borders, [] );
    }
    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);

    road.draw( ctx );
    car.draw( ctx );
    for( let i = 0; i < traffic.length; i++){
        traffic[i].draw( ctx );
    }


    ctx.restore();

    requestAnimationFrame( animate)
}