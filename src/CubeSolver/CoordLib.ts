import { Coordinate } from "./Models/Coordinate";
import { ICoordLib } from "./ICoordLib";
import { CoordinateNode } from "./Models/CoordinateNode";

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
    FindOrCreateNode(searchCoord: Coordinate, startingNodes: CoordinateNode[]): CoordinateNode{
        let resultNode: CoordinateNode | null;
        let filteredArr: CoordinateNode[] = startingNodes.filter((node: CoordinateNode) => node.coordinate.x === searchCoord.x
            && node.coordinate.y === searchCoord.y && node.coordinate.z === searchCoord.z);
        resultNode = filteredArr.length === 1 ? filteredArr[0] : null;

        return resultNode ?? new CoordinateNode(searchCoord, false);//Default to inactive state for new nodes
    };
    InsertNode(newNode: CoordinateNode, newNodeArr: CoordinateNode[]): CoordinateNode[]{
        console.log(newNode, newNodeArr);
        throw new Error('Not Implemented');
        return [];
    }
}