import { CoordinateNode } from "../Models/CoordinateNode";
import { ICycleLib } from "./ICycleLib";

export class CycleLib implements ICycleLib{
    CycleCount: number = 6;
    StartNodes: CoordinateNode[] = [];
    EndNodes: CoordinateNode[] = [];
    constructor(startNodes: CoordinateNode[]){
        this.StartNodes = startNodes;
    }
    RunCycle():void{

    }
    RunAllCycles():void{

    }
    GetActiveNodes(): CoordinateNode[]{
        throw new Error('Not Implemented');
        return this.EndNodes;
    }
}