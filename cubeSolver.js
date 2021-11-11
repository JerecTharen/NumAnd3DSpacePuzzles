
class Coordinate{
    value = null;
    x;
    y;
    z;
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getNeighbors(){
        
    }
}
let startCoords = {x : 0, y : 0, z : 0};
let diffArr = [-1, 0, 1];
let i = 0;
diffArr.forEach(x => {
    diffArr.forEach(y => {
        diffArr.forEach(z => {
            let nX = startCoords.x + x;
            let nY = startCoords.y + y;
            let nZ = startCoords.z + z;
            console.log('ccords are: ', nX, nY, nZ);
            i++;
            console.log('i is', i);
        });
    });
});
