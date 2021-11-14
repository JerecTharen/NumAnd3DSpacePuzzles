import { Numbers } from "./NumberFinder/numbers";
import { numData } from "./NumberFinder/numbersData";

const shouldRunNumbers: boolean = true;
const shouldRunCubeSolver: boolean = false;

if(shouldRunNumbers){
    let numberFinder:Numbers = new Numbers(numData());
    console.log(`Result is: ${numberFinder.getMultFromPair(numberFinder.findSumPair(2020))}`);
}

if(shouldRunCubeSolver){
    console.log('Cube Solver not implemented!');
}
