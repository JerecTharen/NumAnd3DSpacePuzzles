import { Coordinate } from '../Models/Coordinate';
import { CoordLib } from './CoordLib';
import { ICoordLib } from './ICoordLib';
import { CoordinateNode } from '../Models/CoordinateNode';

describe('CoordLib', ()=>{
    let SUT: ICoordLib;
    beforeEach(()=>{
        SUT = new CoordLib();
    });

    describe('GetNeighborCoords', ()=>{
        it('should find 26 neighbors', ()=>{
            //Arrange
            const expectedLength: number = 26;
            const startingCoord: Coordinate = new Coordinate(0, 0, 0);

            //Act
            let actualNeighbors: Coordinate[] = SUT.GetNeighborCoords(startingCoord);

            //Assert
            expect(actualNeighbors.length).toBe(expectedLength);
        });
        it('should not find a coordinate with the same position as itself', ()=>{
            //Arrange
            const expectedLength: number = 0;
            const startingCoord: Coordinate = new Coordinate(0, 0, 0);

            //Act
            let actualNeighbors: Coordinate[] = SUT.GetNeighborCoords(startingCoord);
            let arrayWithOriginal: Coordinate[] = actualNeighbors.filter((coord: Coordinate) => 
                coord.x === startingCoord.x && coord.y === startingCoord.y && coord.z === startingCoord.z);

            //Assert
            expect(arrayWithOriginal.length).toBe(expectedLength);
        });
        it('should only find coordinates with a difference of x, y, or z by 1 from the start position', ()=>{
            //Arrange
            const expectedLength: number = 0;
            const startingCoord: Coordinate = new Coordinate(0, 0, 0);

            //Act
            let actualNeighbors: Coordinate[] = SUT.GetNeighborCoords(startingCoord);
            let arrayWithLargeDiff: Coordinate[] = actualNeighbors.filter((coord: Coordinate) => 
                Math.abs(coord.x - startingCoord.x) > 1 
                && Math.abs(coord.y - startingCoord.y) > 1 
                && Math.abs(coord.z - startingCoord.z) > 1);

            //Assert
            expect(arrayWithLargeDiff.length).toBe(expectedLength);
        });
    });

    describe('FindOrCreateNode', ()=>{
        //Want to test this for both starting negative and positive to make sure it is not defaulting active status
        for (let i:number = 0; i < 2; i++) {
            let isStartNodeActive: boolean = i === 0;
            it(`should find a node that already exists with state: ${isStartNodeActive ? 'active' : 'inactive'}`, ()=>{
                //Arrange
                const startCoord: Coordinate = new Coordinate(0, 0, 0);
                const expectedNode: CoordinateNode = new CoordinateNode(startCoord, isStartNodeActive);
                const unexpectedNode: CoordinateNode = new CoordinateNode(new Coordinate(
                    Math.random(),
                    Math.random(),
                    Math.random()
                ), !isStartNodeActive);

                let startingNodes = [unexpectedNode, expectedNode];
                
                //Act
                let actualFoundNode: CoordinateNode = SUT.FindOrCreateNode(startCoord, startingNodes);
                
                //Assert
                expect(actualFoundNode).toEqual(expectedNode);
            });
        }
        it('should create a node if one is not found', ()=>{
            //Arrange
            const startCoord: Coordinate = new Coordinate(0, 0, 0);
            const expectedNode: CoordinateNode = new CoordinateNode(startCoord, false);//Should always create false
            const unexpectedNode: CoordinateNode = new CoordinateNode(new Coordinate(
                Math.random(),
                Math.random(),
                Math.random()
            ), true);

            let startingNodes = [unexpectedNode];
            
            //Act
            let actualFoundNode: CoordinateNode = SUT.FindOrCreateNode(startCoord, startingNodes);
            
            //Assert
            expect(actualFoundNode).toEqual(expectedNode);
        });
    });

    describe('InsertNode', ()=>{
        it('should insert a node if not in the array', ()=>{
            //Arrange
            const expectedCoord: Coordinate = new Coordinate(0, 0, 0);
            const expectedNode: CoordinateNode = new CoordinateNode(expectedCoord, false);
            const expectedArr: CoordinateNode[] = [expectedNode];

            //Act
            let actualNewArr: CoordinateNode[] = SUT.InsertNode(expectedNode, []);

            //Assert
            expect(actualNewArr).toEqual(expectedArr);
        });
        it('should not duplicate a node already in the array', ()=>{
            //Arrange
            const expectedCoord: Coordinate = new Coordinate(0, 0, 0);
            const expectedNode: CoordinateNode = new CoordinateNode(expectedCoord, false);
            const expectedNode2: CoordinateNode = new CoordinateNode(new Coordinate(1, 0, 0), false);
            const expectedArr: CoordinateNode[] = [expectedNode, expectedNode2];

            //Act
            let actualNewArr: CoordinateNode[] = SUT.InsertNode(expectedNode, expectedArr);

            //Assert
            expect(actualNewArr).toEqual(expectedArr);
        });
        it('should not modify the original array', ()=>{
            //Arrange
            const expectedCoord: Coordinate = new Coordinate(0, 0, 0);
            const expectedNode: CoordinateNode = new CoordinateNode(expectedCoord, false);
            const expectedNode2: CoordinateNode = new CoordinateNode(new Coordinate(1, 0, 0), false);
            const expectedArr: CoordinateNode[] = [expectedNode, expectedNode2];
            let expectedArrLength: number = expectedArr.length;

            //Act
            let actualNewArr: CoordinateNode[] = SUT.InsertNode(expectedNode, expectedArr);

            //Assert
            expect(actualNewArr.length).toEqual(expectedArrLength);
        });
    });

    describe('GetActiveNodesFromArr', ()=>{
        it('should return an empty array if there are no active nodes', ()=>{
            //Arrange
            const coord: Coordinate = new Coordinate(0, 0, 0);
            const node: CoordinateNode = new CoordinateNode(coord, false);
            const expectedArr: CoordinateNode[] = [];

            //Act
            let resultArr: CoordinateNode[] = SUT.GetActiveNodesFromArr([node]);

            //Assert
            expect(resultArr).toEqual(expectedArr);
        });
        it('should return only nodes that are active', ()=>{
            //Arrange
            let expectedArr: CoordinateNode[] = [];
            for(let i: number = 0; i < 10; i++){
                let coord: Coordinate = new Coordinate(i, i, i);
                let node: CoordinateNode = new CoordinateNode(coord, true);
                expectedArr.push(node);
            }
            let unexpectedCoord = new Coordinate(1, 0, 0)
            let unexpectedNode = new CoordinateNode(unexpectedCoord, false);
            let startingArr: CoordinateNode[] = [unexpectedNode].concat(expectedArr);

            //Act
            let resultArr: CoordinateNode[] = SUT.GetActiveNodesFromArr(startingArr);

            //Assert
            expect(resultArr).toEqual(expectedArr);
        });
    });

    describe('DecideActiveStatus', ()=>{
        //Testing start as inactive
        it('should activate an inactive node if there are 3 active neighbors', ()=>{
            //Arrange
            const expectedIsActive:boolean = true;
            const activeNeighborCount: number = 3;
            const startIsActive:boolean = false;
            let startNode: CoordinateNode = new CoordinateNode(new Coordinate(0, 0, 0), startIsActive);

            //Act
            let actualNode: CoordinateNode = SUT.DecideActiveStatus(startNode, activeNeighborCount);

            //Assert
            expect(actualNode.isActive).toBe(expectedIsActive);
        });
        it('should not activate an inactive node if there are 2 active neighbors', ()=>{
            //Arrange
            const expectedIsActive:boolean = false;
            const activeNeighborCount: number = 2;
            const startIsActive:boolean = false;
            let startNode: CoordinateNode = new CoordinateNode(new Coordinate(0, 0, 0), startIsActive);

            //Act
            let actualNode: CoordinateNode = SUT.DecideActiveStatus(startNode, activeNeighborCount);

            //Assert
            expect(actualNode.isActive).toBe(expectedIsActive);
        });

        //Test start as active
        //Test stay active
        it('should not de-activate an inactive node if there are 2 active neighbors', ()=>{
            //Arrange
            const expectedIsActive:boolean = true;
            const activeNeighborCount: number = 2;
            const startIsActive:boolean = true;
            let startNode: CoordinateNode = new CoordinateNode(new Coordinate(0, 0, 0), startIsActive);

            //Act
            let actualNode: CoordinateNode = SUT.DecideActiveStatus(startNode, activeNeighborCount);

            //Assert
            expect(actualNode.isActive).toBe(expectedIsActive);
        });
        it('should not de-activate an inactive node if there are 3 active neighbors', ()=>{
            //Arrange
            const expectedIsActive:boolean = true;
            const activeNeighborCount: number = 3;
            const startIsActive:boolean = true;
            let startNode: CoordinateNode = new CoordinateNode(new Coordinate(0, 0, 0), startIsActive);

            //Act
            let actualNode: CoordinateNode = SUT.DecideActiveStatus(startNode, activeNeighborCount);

            //Assert
            expect(actualNode.isActive).toBe(expectedIsActive);
        });
        //Test change active
        it('should de-activate an inactive node if there are 1 active neighbors', ()=>{
            //Arrange
            const expectedIsActive:boolean = false;
            const activeNeighborCount: number = 1;
            const startIsActive:boolean = true;
            let startNode: CoordinateNode = new CoordinateNode(new Coordinate(0, 0, 0), startIsActive);

            //Act
            let actualNode: CoordinateNode = SUT.DecideActiveStatus(startNode, activeNeighborCount);

            //Assert
            expect(actualNode.isActive).toBe(expectedIsActive);
        });
        it('should de-activate an inactive node if there are 0 active neighbors', ()=>{
            //Arrange
            const expectedIsActive:boolean = false;
            const activeNeighborCount: number = 0;
            const startIsActive:boolean = true;
            let startNode: CoordinateNode = new CoordinateNode(new Coordinate(0, 0, 0), startIsActive);

            //Act
            let actualNode: CoordinateNode = SUT.DecideActiveStatus(startNode, activeNeighborCount);

            //Assert
            expect(actualNode.isActive).toBe(expectedIsActive);
        });
        it('should de-activate an inactive node if there are 4 active neighbors', ()=>{
            //Arrange
            const expectedIsActive:boolean = false;
            const activeNeighborCount: number = 4;
            const startIsActive:boolean = true;
            let startNode: CoordinateNode = new CoordinateNode(new Coordinate(0, 0, 0), startIsActive);

            //Act
            let actualNode: CoordinateNode = SUT.DecideActiveStatus(startNode, activeNeighborCount);

            //Assert
            expect(actualNode.isActive).toBe(expectedIsActive);
        });
    });
});