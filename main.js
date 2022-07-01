const canvas = document.querySelector("#mainCanvas");


canvas.height = window.innerHeight;
canvas.width = 300;

const ctx = canvas.getContext("2d");
console.warn({ Car });


console.log({ Road });
const road = new Road( canvas.width / 2, canvas.width * 0.7);
const car = new Car( road.getLaneCenter(0), 100, 30, 50);


console.log({ road });


animate(  );

function animate(  ){
    car.update( canvas, road.borders );
    ctx.clearRect( 0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.85);

    road.draw( ctx );
    car.draw( ctx );

    ctx.restore();

    requestAnimationFrame( animate)
}