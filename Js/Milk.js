class Milk{
    constructor(){
        this.image = loadImage("Images/Milk.png");
        this.FoodStock = 0;
        this.lastFed;
        this.foodStockRef;
    }

    getFoodStock(){
        return this.FoodStock;
    }

    updateFoodStock(x){
        this.FoodStock = x;
    }

    deductFood(FoodStock){
        FoodStock = FoodStock - 1;
    }

    display(){

        var x = 80, y = 100;
        imageMode(CENTER);
        image(this.image, 720, 280, 70, 70);
        if(this.FoodStock !=0){
            for(var i = 0; i<this.FoodStock; i++){
                if(i % 5 === 0){
                    x = 130,
                    y = y + 55;                
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;            
            }
        }
}
}