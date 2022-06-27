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

        this.sensor = new Sensor( this );
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
        this.sensor.draw( ctx );
    }

    update( canvas ){
        this.#move();
        this.sensor.update();
    }

    #move(){
        if( this.controller.forward){
            this.speed += this.accelaration;
        } 

        if( this.controller.reverse){
            this.speed -= this.accelaration;
        } 
 

        //flip angle when car is in reverse 
        if( this.speed != 0){
            const flip = this.speed > 0 ? 1 : -1;
            if( this.controller.left){
                this.angle += .02 * flip;
            }
            if( this.controller.right){
                this.angle -= .02 * flip;
            } 
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