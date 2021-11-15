import { Coordinate } from "./Coordinate";

export interface ICoordLib{
    GetNeighborCoords(startCoord: Coordinate):Coordinate[];
}