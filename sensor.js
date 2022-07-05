class Sensor {
    constructor( car ){
        this.car = car;
        this.rayCount= 9;
        this.rayLength = 150;
        this.raySpread = Math.PI  ;
        this.rays = [];

        this.readings = [];

    }

    update( roadBorders, traffic ){
        this.#castRays();
        this.readings = [];
        for( let i = 0; i <  this.rays.length; i++){
            const reading = this.#getReading(
                 this.rays[ i ],
                  roadBorders,
                  traffic
                   );
            this.readings.push( reading );
        }
    }

    #getReading( ray, roadBorders, traffic){
        let touches = [];
        for( let i = 0; i < roadBorders.length; i++){
            const touch = getIntersection(
                ray[0], ray[ 1],
                roadBorders[i][0],
                roadBorders[i][1],
            )
            if( touch ){
                touches.push( touch );
            }
        }


        for( let i = 0; i < traffic.length; i++){
            const polygon = traffic[i].polygon;
            for(let j = 0; j < polygon.length; j++){
                const intersecting = getIntersection(
                    ray[0],
                    ray[ 1 ],
                    polygon[ j ],
                    polygon[ (j + 1) % polygon.length ]
                );
                if( intersecting ) touches.push( intersecting );

            }


        }

        if( ! touches.length ){
            return null;
        } else {
            const offsets = touches.map(t => t.offset);
            const minOffset = Math.min( ...offsets );

            return touches.find( t => t.offset === minOffset); 

        }
    }

    #castRays(){
        this.rays = [];

        for( let i = 0; i < this.rayCount; i++){
            const rayAngle = linearInterpolate(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount === 1 ? .5 : i /( this.rayCount - 1)
            ) + this.car.angle;


            const start = { x: this.car.x, y: this.car.y};
            const end = {
                x: this.car.x - Math.sin( rayAngle ) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            }

            this.rays.push([start, end])
        }
    }

    draw( ctx ){

        for( let i = 0; i < this.rayCount; i++){

            let end = this.rays[i][1];
           
            if(this.readings[i]){
                end = this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            

            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = 'purple';
            ctx.lineWidth = 3;

            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y,
            );

            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }
}