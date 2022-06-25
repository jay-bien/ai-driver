class Car {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.accelaration = .1;
        this.maxSpeed = 3;
        this.friction = .03;

        this.angle = 0;

        this.controller = new Controller();
    }


    

    draw( ctx ){
        ctx.save();
        ctx.translate( this.x, this.y );
        ctx.rotate( -this.angle );

        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )
        ctx.fill();
        ctx.restore();
    }

    update( canvas ){
        if( this.controller.forward){
            this.speed += this.accelaration;
        } else if( this.controller.right){
            this.angle -= .02;
        } else if( this.controller.reverse){
            this.speed -= this.accelaration;
        } else if( this.controller.left){
            this.angle += .02;
        }

        if( this.speed > this.maxSpeed) this.speed = this.maxSpeed;
        if( this.speed < -this.maxSpeed ) this.speed = -this.maxSpeed;
        if( this.speed > 0 ) this.speed -= this.friction;
        if( this.speed < 0 ) this.speed += this.friction;
        if( Math.abs( this.speed) < this.friction ) this.speed = 0;
        this.x -= Math.sin( this.angle ) * this.speed;
        this.y -= Math.cos( this.angle ) * this.speed;
    }
}