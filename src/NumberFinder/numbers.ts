import { INumbers } from "./iNumbers"

export class Numbers implements INumbers{
    numArr;
    constructor(numArr: number[]) {
        this.numArr = numArr;
    }
    findSumPair(sum:number):number[]{
        throw new Error('Not Implemented');
    }
    getMultFromPair(numPair:number[]):number{
        throw new Error('Not Implemented');
    }
}