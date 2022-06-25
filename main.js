const canvas = document.querySelector("#mainCanvas");


canvas.height = window.innerHeight;
canvas.width = 300;

const ctx = canvas.getContext("2d");




const car = new Car(100, 100, 30, 50);
console.log({ car});
car.draw( ctx );


animate(  );

function animate(  ){
    car.update( canvas );
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    car.draw( ctx );

    requestAnimationFrame( animate)
}