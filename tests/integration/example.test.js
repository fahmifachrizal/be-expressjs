/**
 * Example Unit Test
 * 
 * Unit tests focus on testing individual functions or classes in isolation,
 * often mocking external dependencies like the database.
 */

describe('Unit Tests', () => {
  // Example: Testing a simple utility function
  describe('Math Utility', () => {
    const add = (a, b) => a + b;

    it('should correctly add two numbers', () => {
      const result = add(2, 3);
      expect(result).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-1, -1)).toBe(-2);
    });
  });
});