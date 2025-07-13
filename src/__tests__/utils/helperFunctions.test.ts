import {
  safeString,
  safeNumber,
  getAuthorsString,
} from '../../utils/helpers';

describe('Helper Functions', () => {
  describe('safeString', () => {
    it('should return the string value when input is valid', () => {
      expect(safeString('test')).toBe('test');
    });

    it('should return empty string when input is null or undefined', () => {
      expect(safeString(null)).toBe('');
      expect(safeString(undefined)).toBe('');
    });

    it('should convert numbers to strings and return fallback for objects', () => {
      expect(safeString(123)).toBe('123');
      expect(safeString({})).toBe(''); // Your function returns fallback for objects
    });
  });

  describe('safeNumber', () => {
    it('should return the number when input is valid', () => {
      expect(safeNumber(42)).toBe(42);
      expect(safeNumber('42')).toBe(42);
    });

    it('should return 0 when input is invalid', () => {
      expect(safeNumber(null)).toBe(0);
      expect(safeNumber(undefined)).toBe(0);
      expect(safeNumber('invalid')).toBe(0);
    });
  });

  describe('getAuthorsString', () => {
    it('should return formatted authors string with "and"', () => {
      expect(getAuthorsString(['John Doe', 'Jane Smith'])).toBe('John Doe and Jane Smith');
    });

    it('should handle single author', () => {
      expect(getAuthorsString(['John Doe'])).toBe('John Doe');
    });

    it('should return "Unknown Author" for empty array', () => {
      expect(getAuthorsString([])).toBe('Unknown Author');
    });
  });
});
