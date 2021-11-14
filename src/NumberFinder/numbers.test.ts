import { INumbers } from './iNumbers';
import {Numbers} from './numbers';

describe('Numbers', ()=>{
    //System under test
    let SUT: INumbers;
    beforeEach(()=>{
        //Test will use numbers from example
        SUT = new Numbers([1721,
            979,
            366,
            299,
            675,
            1456]);
    });

    describe('findSumPair', ()=>{
        it('should find numbers that match the given sum', ()=>{
            //Arrange
            const expectedPair:number[] = [1721, 299];
            const expectedSum:number = 2020;

            //Act
            let actualPair: number[] = SUT.findSumPair(expectedSum);

            //Assert
            expect(actualPair).toEqual(expectedPair);
        });
        it('should not add the same number twice', ()=>{
            //Arrange
            const expectedPair:number[] = [1721, 299];
            const expectedSum:number = 2020;
            SUT.numArr = [1010].concat(SUT.numArr);

            //Act
            let actualPair: number[] = SUT.findSumPair(expectedSum);

            //Assert
            expect(actualPair).toEqual(expectedPair);
        });
        it('should always come back with 2 numbers', ()=>{
            //Arrange
            const expectedPairLength:number= 2;
            const expectedSum:number = 2020;
            SUT.numArr = [2020].concat(SUT.numArr);

            //Act
            let actualPair: number[] = SUT.findSumPair(expectedSum);

            //Assert
            expect(actualPair.length).toBe(expectedPairLength);
        });
    });

    describe('getMultFromPair', ()=>{
        it('should multiply 2 numbers together', ()=>{
            //Arrange
            const expectedMult: number = 514579;
            const startingPair: number[] = [1721, 299];

            //Act
            let actualMult: number = SUT.getMultFromPair(startingPair);

            //Assert
            expect(actualMult).toBe(expectedMult);
        });
    });
});