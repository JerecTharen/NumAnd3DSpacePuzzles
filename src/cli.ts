//Number puzzle dependencies
import { Numbers } from "./NumberFinder/numbers";
import { INumbers } from "./NumberFinder/iNumbers";
import { numData } from "./NumberFinder/numbersData";

const shouldRunNumbers: boolean = true;
const shouldRunCubeSolver: boolean = false;

if(shouldRunNumbers){
    let numberFinder:INumbers = new Numbers(numData());
    console.log(`Number Result is: ${numberFinder.getMultFromPair(numberFinder.findSumPair(2020))}`);
}

if(shouldRunCubeSolver){
    console.log('Cube Solver not implemented!');
}
