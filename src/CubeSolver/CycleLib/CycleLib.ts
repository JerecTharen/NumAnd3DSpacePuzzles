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
        /**
         * TODO: make sure that it only does logic based off of active nodes at the start of the loop
         * and that it does not use the new active status for nodes created vertically
         */
        this.EndNodes = [];
        //Separate array from the start array that can hold inactive nodes that were not tracked in the start arrray
        let startAndNewNodes: CoordinateNode[] = [...this.StartNodes];
        this.StartNodes.forEach((node: CoordinateNode) => {
            //Get Neighbors
            let neighborCoords: Coordinate[] = this.coordLib.GetNeighborCoords(node.coordinate);
            let copiedNode: CoordinateNode = {...node};

            //Make sure relavant non-tracked nodes are created
            neighborCoords.forEach((coord: Coordinate) => 
                this.coordLib.InsertNode(this.coordLib.FindOrCreateNode(coord, startAndNewNodes), startAndNewNodes));
            
            let activeNeighborCount:number = neighborCoords.filter((coord: Coordinate)=> 
                this.coordLib.FindOrCreateNode(coord, startAndNewNodes).isActive).length;
            copiedNode = this.coordLib.DecideActiveStatus(copiedNode, activeNeighborCount);

            //Insert
            this.EndNodes = this.coordLib.InsertNode(node, this.EndNodes);
            //Start over and repeat for the rest of the original nodes
            this.StartNodes = [...this.EndNodes];
        });
    }
    RunAllCycles():void{
        for(let c: number = 0; c < this.CycleCount; c++)
            this.RunCycle();
    }
}