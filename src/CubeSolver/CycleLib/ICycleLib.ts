import { CoordinateNode } from "../Models/CoordinateNode";

export interface ICycleLib{
    CycleCount: number;
    StartNodes: CoordinateNode[];
    EndNodes: CoordinateNode[];
    RunCycle():void;
    RunAllCycles():void;
    GetActiveNodes(): CoordinateNode[];
}