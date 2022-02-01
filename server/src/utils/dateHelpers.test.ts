import {genMomentDate} from "./dateHelpers";

describe('convertMomentDate function', ()=> {
    it('convert string date to moment.Moment by given format', ()=> {
      const year = "2021";
      const month = "10";
      const day = "31";
      const result = genMomentDate({strDate:`${year}${month}${day}`, defaultDate:"20220131"});
      expect(result.format('YYYY')).toBe(year);
      expect(result.format("M")).toBe(month);
      expect(result.format("D")).toBe(day);
    });
})