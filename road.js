class Road {
    constructor( x, width, laneCount = 2){
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width /2;
        this.right = x + width / 2;
        this.top = -Number.MAX_SAFE_INTEGER;
        this.bottom = Number.MAX_SAFE_INTEGER;
    }

    draw( ctx ){
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'white';


        for( let i = 0; i <= this.laneCount; i++){
            const x = linearInterpolate(
                this.left,
                this.right,
                i / this.laneCount
            )
            ctx.beginPath();
            ctx.moveTo(x, this.top );
            ctx.lineTo( x, this.bottom );
            ctx.stroke();
        }


        
        // ctx.beginPath();
        // ctx.moveTo( this.right, this.top );
        // ctx.lineTo( this.right, this.bottom );
        // ctx.stroke();
    }
}

function linearInterpolate( A, B, t){
    return A+(B-A) * t;
}