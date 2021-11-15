import { Coordinate } from "./Models/Coordinate";
import { ICoordLib } from "./ICoordLib";

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
}