import { INumbers } from "./iNumbers"

export class Numbers implements INumbers{
    numArr;
    constructor(numArr: number[]) {
        this.numArr = numArr;
    }
    findSumPair(sum:number):number[]{
        let resultPair: number[] = [];
        for(let i:number = 0; i < this.numArr.length && resultPair.length < 2; i++){
            let firstNum:number = this.numArr[i];
            for(let x:number = i; x < this.numArr.length && resultPair.length < 2; x++){
                let secondNum:number = this.numArr[x];
                if((firstNum + secondNum) === sum && i !== x){
                    resultPair.push(firstNum);
                    resultPair.push(secondNum);
                    break;
                }
            }
        }
        return resultPair;
    }
    getMultFromPair(numPair:number[]):number{
        if(numPair.length !== 2)
            throw new Error('Two numbers are expected');
        return numPair[0] * numPair[1];
    }
}