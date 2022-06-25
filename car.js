class Car {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.accelaration = .1;
        this.maxSpeed = 3;
        this.friction = .03

        this.controller = new Controller();
    }


    

    draw( ctx ){
        ctx.beginPath();
        ctx.rect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        )
        ctx.fill();
    }

    update( canvas ){
        console.log( ctx.width );
        if( this.controller.forward){
            this.speed += this.accelaration;
        } else if( this.controller.right){
            ( this.x + 1 ) <= canvas.width 
            ? this.x += 1
            : null;
        } else if( this.controller.reverse){
            this.speed -= this.accelaration;
        } else if( this.controller.left){
            ( this.x - 1) >= 0 
            ? this.x -=1
            : null;
        }

        if( this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if( this.speed < -this.maxSpeed ) this.speed = -this.maxSpeed;
        if( this.speed > 0 ) this.speed -= this.friction;
        if( this.speed < 0 ) this.speed += this.friction;
        if( Math.abs( this.speed) < this.friction ) this.speed = 0;
        this.y -= this.speed;
    }
}