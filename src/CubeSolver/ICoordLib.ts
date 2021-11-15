import { Coordinate } from "./Models/Coordinate";

export interface ICoordLib{
    GetNeighborCoords(startCoord: Coordinate):Coordinate[];
}