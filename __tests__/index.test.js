describe('Game', () => {

  // Game class can be instantiated without errors
  it('should instantiate Game class without errors', () => {
    const game = new Game();
    expect(game).toBeDefined();
  });

  // Game class can preload assets without errors
  it('should preload assets without errors', () => {
    const game = new Game();
    expect(() => {
      game.preload();
    }).not.toThrow();
  });

  // Game class can create game objects without errors
  it('should create game objects without errors', () => {
    const game = new Game();
    expect(() => {
      game.create();
    }).not.toThrow();
  });

  // Game class can handle limit_asteroids being set to 0
  it('should handle limit_asteroids being set to 0', () => {
    const game = new Game();
    limit_asteroids = 0;
    expect(() => {
      game.levelUp(asteroids.create(0, 0, 'asteroid'));
    }).not.toThrow();
  });

  // Game class can handle disable_asteroids being an empty array
  it('should handle disable_asteroids being an empty array', () => {
    const game = new Game();
    disable_asteroids = [];
    expect(() => {
      game.levelUp(asteroids.create(0, 0, 'asteroid'));
    }).not.toThrow();
  });

  // Game class can handle asteroids countActive returning 0
  it('should handle asteroids countActive returning 0', () => {
    const game = new Game();
    asteroids.countActive = jest.fn(() => 0);
    expect(() => {
      game.levelUp(asteroids.create(0, 0, 'asteroid'));
    }).not.toThrow();
  });
});
