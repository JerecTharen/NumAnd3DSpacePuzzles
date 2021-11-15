import { Coordinate } from "./Coordinate";

export class CoordinateNode{
    coordinate: Coordinate;
    isActive: boolean;
    constructor(coord: Coordinate, isActive: boolean){
        this.coordinate = coord;
        this.isActive = isActive;
    }
}