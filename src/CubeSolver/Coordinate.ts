export class Coordinate{
    x:number;
    y:number;
    z:number;
    isActive:boolean;
    constructor(x:number, y:number, z:number, isActive:boolean){
        this.x = x;
        this.y = y;
        this.z = z;
        this.isActive = isActive;
    }
}