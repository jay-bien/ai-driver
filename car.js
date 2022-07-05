class Car {
    
    constructor(x, y, width, height, maxSpeed = 3, controlType = "DUMMY"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.accelaration = .1;
        this.maxSpeed = maxSpeed;
        this.friction = .03;

        this.angle = 0;

        this.polygon = [];
        this.damaged = false;

        if( controlType !== "DUMMY"){
            this.sensor = new Sensor( this );
        }

        this.controller = new Controller( controlType );
    }


    

    draw( ctx ){


        ctx.beginPath();
        if( this.damaged){
            ctx.fillStyle = "red"
        } else {
            ctx.fillStyle = "black"
        }
        ctx.moveTo(
            this.polygon[0 ].x,
            this.polygon[0].y
        );
        for( let i =1; i < this.polygon.length; i++){
            ctx.lineTo(
                this.polygon[ i ].x,
                this.polygon[ i ].y 
            )
        };
        ctx.fill();
        if( this.sensor ) this.sensor.draw( ctx );
    }

    update( canvas, roadBorders, traffic ){
        if( !this.damaged){
            this.#move();
            this.damaged = this.#assessDamage( roadBorders, traffic );
            this.polygon = this.#createPolygon(); 
        }
        if( this.sensor ){
            this.sensor.update( roadBorders, traffic);
        }
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


    #createPolygon(){
        const points = [];
        const rad = Math.hypot( this.width, this.height ) / 2;
        const alpha = Math.atan2( this.width, this.height );
        points.push({
            x: this.x - Math.sin( this.angle - alpha ) * rad,
            y: this.y - Math.cos( this.angle - alpha) * rad
        });

        points.push({
            x: this.x - Math.sin( this.angle + alpha) * rad,
            y: this.y - Math.cos( this.angle + alpha) * rad,
        });

        points.push({
            x: this.x - Math.sin( Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha ) * rad
        });
        points.push({
            x: this.x - Math.sin( Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha ) * rad
        });

        return points;
    }

    #assessDamage( roadBorders, traffic ){
        for( let i = 0; i < roadBorders.length; i++ ){
            if( polysIntersect( this.polygon, roadBorders[ i ] ) ) 
                return true;
        }

        for( let i = 0; i < traffic.length; i++ ){
            if( polysIntersect( this.polygon, traffic[ i ].polygon ) ){
                return true;
            } 
        }
        return false;
    }
    

}