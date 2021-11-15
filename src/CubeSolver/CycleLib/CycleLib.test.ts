import { ICycleLib } from './ICycleLib';
import { CycleLib } from './CycleLib';
import { ICoordLib } from '../CoordLib/ICoordLib';
import { CoordLib } from '../CoordLib/CoordLib';
import { CoordinateNode } from '../Models/CoordinateNode';
import { Coordinate } from '../Models/Coordinate';

describe('CycleLib', ()=>{
    let SUT: ICycleLib;
    let coordLib: ICoordLib = new CoordLib();
    beforeEach(()=>{
        //Programming out the starting coordinates for the demonstartion pattern
        const startCoords: CoordinateNode[] = [
            //First row
            new CoordinateNode(new Coordinate(10, 10, 0), false),
            new CoordinateNode(new Coordinate(11, 10, 0), true),
            new CoordinateNode(new Coordinate(12, 10, 0), false),
            //Second row
            new CoordinateNode(new Coordinate(10, 11, 0), false),
            new CoordinateNode(new Coordinate(11, 11, 0), false),
            new CoordinateNode(new Coordinate(12, 11, 0), true),
            //Third row
            new CoordinateNode(new Coordinate(10, 12, 0), true),
            new CoordinateNode(new Coordinate(11, 12, 0), true),
            new CoordinateNode(new Coordinate(12, 12, 0), true)
        ];

        SUT = new CycleLib(startCoords);
    });

    it('should always have a cycle count of 6', ()=>{
        expect(SUT.CycleCount).toBe(6);
    });

    describe('RunCycle', ()=>{
        //Testing if it activates/adds node on the z axis
        it('should activate 12, 12, 1 on the first cycle', ()=>{
            //Arrange
            const expectedX: number = 12;
            const expectedY: number = 12;
            const expectedZ: number = 1;
            const expectedCoord: Coordinate = new Coordinate(expectedX, expectedY, expectedZ);
            const expectedNode: CoordinateNode = new CoordinateNode(expectedCoord, true);
            const expectedArr: CoordinateNode[] = [expectedNode];

            //Act
            SUT.RunCycle();
            let filteredArr: CoordinateNode[] = SUT.EndNodes.filter((node: CoordinateNode) => 
                node.coordinate.x === expectedX
                && node.coordinate.y === expectedY 
                && node.coordinate.z === expectedZ);

            //Assert
            expect(filteredArr).toEqual(expectedArr);
        });
        //Testing if it keep stuff inactive
        it('should keep 10, 10, 0 inactive on the first cyle', ()=>{
            //Arrange
            const expectedX: number = 10;
            const expectedY: number = 10;
            const expectedZ: number = 0;
            const expectedCoord: Coordinate = new Coordinate(expectedX, expectedY, expectedZ);
            const expectedNode: CoordinateNode = new CoordinateNode(expectedCoord, false);
            const expectedArr: CoordinateNode[] = [expectedNode];

            //Act
            SUT.RunCycle();
            let filteredArr: CoordinateNode[] = SUT.EndNodes.filter((node: CoordinateNode) => 
                node.coordinate.x === expectedX
                && node.coordinate.y === expectedY 
                && node.coordinate.z === expectedZ);

            //Assert
            expect(filteredArr).toEqual(expectedArr);
        });

        //Checking setup of demo test
        it('should have 5 active nodes before a cycle', ()=>{
            //Assert
            expect(coordLib.GetActiveNodesFromArr(SUT.StartNodes).length).toBe(5);
        });
        
        //Counted the number of active nodes in the demo manually
        it('should have 61 active nodes after the first cycle', ()=>{
            //Act
            SUT.RunCycle();
            
            //Assert
            expect(coordLib.GetActiveNodesFromArr(SUT.EndNodes).length).toBe(61);
        });
    });
});
