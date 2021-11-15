import { Coordinate } from './Coordinate';
import { CoordLib } from './CoordLib';
import { ICoordLib } from './ICoordLib';

describe('CoordLib', ()=>{
    let SUT: ICoordLib;
    beforeEach(()=>{
        SUT = new CoordLib();
    });

    describe('GetNeighborCoords', ()=>{
        it('should find 26 neighbors', ()=>{
            //Arrange
            const expectedLength: number = 26;
            const startingCoord: Coordinate = new Coordinate(0, 0, 0, false);

            //Act
            let actualNeighbors: Coordinate[] = SUT.GetNeighborCoords(startingCoord);

            //Assert
            expect(actualNeighbors.length).toBe(expectedLength);
        });
        it('should not find a coordinate with the same position as itself', ()=>{
            //Arrange
            const expectedLength: number = 0;
            const startingCoord: Coordinate = new Coordinate(0, 0, 0, false);

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
            const startingCoord: Coordinate = new Coordinate(0, 0, 0, false);

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
});