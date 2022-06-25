const canvas = document.querySelector("#mainCanvas");


canvas.height = window.innerHeight;
canvas.width = 300;

const ctx = canvas.getContext("2d");

const car = new Car(100, 100, 30, 50);

const road = new Road( canvas.width / 2, canvas.width * .9);
road.draw( ctx );
car.draw( ctx );

console.log({ road });



animate(  );

function animate(  ){
    car.update( canvas );
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    road.draw( ctx );
    car.draw( ctx );

    requestAnimationFrame( animate)
}