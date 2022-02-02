import {genDate} from "./dateHelpers";

describe('convertMomentDate function', ()=> {
    it('convert string date to Date', ()=> {
      const givenDate = "20210101"
      const result = genDate({strDate:givenDate, defaultDate:"20220131"});
      expect(result.getFullYear()).toBe(2021)
      expect(result.getMonth()).toBe(0)
      expect(result.getDate()).toBe(1)
    });

    it('return a dafault date if the given string date is invalid format', ()=> {
      const givenDate = "20210101ad"
      const result = genDate({strDate:givenDate, defaultDate:"20220131"});
      expect(result.getFullYear()).toBe(2022)
      expect(result.getMonth()).toBe(0)
      expect(result.getDate()).toBe(31)
    });
})