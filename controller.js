

class Controller {
    constructor( controlType ){
        this.forward = false;
        this.right = false;
        this.reverse = false;
        this.left = false;


        switch( controlType ){
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
            default:
                break;
        }



        
    }

    #addKeyboardListeners(){
        document.onkeydown = ( event ) => {
            switch( event.key ){
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
            }
        }

        document.onkeyup = ( event ) => {
            switch( event.key ){
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
            }
        }

    }

}