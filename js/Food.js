class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodstock;
        this.lastfed;
    }

    updateFoodStock(){

    }

    deductFoodStock(){

    }

    getFoodStock(){

    }

   display(){
        imageMode(CENTER);

        if (foodStock > 0){
            image(this.image, 720, 220, 70, 70);
        }
    }
}