import { Coordinate } from "../Models/Coordinate";
import { ICoordLib } from "./ICoordLib";
import { CoordinateNode } from "../Models/CoordinateNode";

export class CoordLib implements ICoordLib{
    GetNeighborCoords(startCoord:Coordinate):Coordinate[]{
        const diffArr:number[] = [-1, 0, 1];
        let resultArr: Coordinate[] = [];
        diffArr.forEach(x => {
            diffArr.forEach(y => {
                diffArr.forEach(z => {
                    let nX:number = startCoord.x + x;
                    let nY:number = startCoord.y + y;
                    let nZ:number = startCoord.z + z;
                    if(nX !== startCoord.x || nY !== startCoord.y || nZ !== startCoord.z)
                        resultArr.push(new Coordinate(nX, nY, nZ));
                });
            });
        });
        return resultArr;
    }
    private FindCoordInNodeArr(searchCoord: Coordinate, nodeArr: CoordinateNode[]): CoordinateNode | null{
        let filteredArr: CoordinateNode[] = nodeArr.filter((node: CoordinateNode) => node.coordinate.x === searchCoord.x
            && node.coordinate.y === searchCoord.y && node.coordinate.z === searchCoord.z);
        return filteredArr.length === 1 ? filteredArr[0] : null;
    }

    FindOrCreateNode = (searchCoord: Coordinate, startingNodes: CoordinateNode[]): CoordinateNode => 
        //Default to inactive state if not found
        this.FindCoordInNodeArr(searchCoord, startingNodes) ?? new CoordinateNode(searchCoord, false);

    InsertNode(newNode: CoordinateNode, newNodeArr: CoordinateNode[]): CoordinateNode[]{
        let returnArr: CoordinateNode[] = [... newNodeArr];
        let foundNode: CoordinateNode | null = this.FindCoordInNodeArr(newNode.coordinate, newNodeArr);
        if(foundNode === null)
            returnArr.push(newNode);
        return returnArr;
    }

    GetActiveNodesFromArr(nodeArr: CoordinateNode[]): CoordinateNode[]{
        return nodeArr.filter((node: CoordinateNode) => node.isActive);
    }
}