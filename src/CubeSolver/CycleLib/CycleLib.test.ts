import { ICycleLib } from './ICycleLib';
import { CycleLib } from './CycleLib';

describe('CycleLib', ()=>{
    let SUT: ICycleLib;
    beforeEach(()=>{
        SUT = new CycleLib();
    });

    it('should always have a cycle count of 6', ()=>{
        expect(SUT.CycleCount).toBe(6);
    });
});
