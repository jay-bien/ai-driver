const canvas = document.querySelector("#mainCanvas");


canvas.height = window.innerHeight;
canvas.width = 300;

const ctx = canvas.getContext("2d");
console.warn({ Car });


console.log({ Road });
const road = new Road( canvas.width / 2, canvas.width * .9);
const car = new Car( road.getLaneCenter(0), 100, 30, 50);


console.log({ road });



animate(  );

function animate(  ){
    car.update( canvas );
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    ctx.save();

    road.draw( ctx );
    car.draw( ctx );

    ctx.restore();

    requestAnimationFrame( animate)
}