import { Coordinate } from "../Models/Coordinate";
import { CoordinateNode } from "../Models/CoordinateNode";

export interface ICoordLib{
    GetNeighborCoords(startCoord: Coordinate):Coordinate[];
    FindOrCreateNode(searchCoord: Coordinate, startingNodes: CoordinateNode[]):CoordinateNode;
    InsertNode(newNode: CoordinateNode, newNodeArr: CoordinateNode[]): CoordinateNode[];
    GetActiveNodesFromArr(nodeArr: CoordinateNode[]): CoordinateNode[];
}