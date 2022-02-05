import '@types/jest';
import {convertInt} from "./numberHelpers";

describe('convert given value to number type', ()=> {
    it('convert given value to number when not isNaN', ()=> {
      const result = convertInt({value:"10", defaultValue:1});
      expect(result).toBe(10)
    });

    it('return defaultValue when given is isNaN', ()=> {
        const result = convertInt({value:"Ten", defaultValue:5});
        expect(result).toBe(5)
      });
})