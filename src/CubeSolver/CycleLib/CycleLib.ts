import { CoordLib } from "../CoordLib/CoordLib";
import { ICoordLib } from "../CoordLib/ICoordLib";
import { Coordinate } from "../Models/Coordinate";
import { CoordinateNode } from "../Models/CoordinateNode";
import { ICycleLib } from "./ICycleLib";

export class CycleLib implements ICycleLib{
    CycleCount: number = 6;
    StartNodes: CoordinateNode[] = [];
    EndNodes: CoordinateNode[] = [];
    private coordLib: ICoordLib;
    constructor(startNodes: CoordinateNode[]){
        this.StartNodes = startNodes;
        this.coordLib = new CoordLib();
    }
    RunCycle():void{
        this.StartNodes.forEach((node: CoordinateNode) => {
            //Get Neighbors
            let neighborCoords: Coordinate[] = this.coordLib.GetNeighborCoords(node.coordinate);

            neighborCoords.forEach((coord: Coordinate) => {
                //Find or create the node
                let node: CoordinateNode = this.coordLib.FindOrCreateNode(coord, this.StartNodes);

                //TODO: Determine if it should be active or inactive

                //Insert
                this.EndNodes = this.coordLib.InsertNode(node, this.EndNodes);
            });
            //Repeat for the rest of the original nodes
        });
    }
    RunAllCycles():void{
        for(let c: number = 0; c < this.CycleCount; c++)
            this.RunCycle();
    }
}