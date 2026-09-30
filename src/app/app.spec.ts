import { App } from './app';
import { PokemonCard } from './pokemon.service';

describe('App Component (Simple & Trivial Tests)', () => {
  let app: App;

  beforeEach(() => {
    // We instantiate the class directly for ultra-simple, fast testing
    app = new App();
  });

  it('should initialize with default states', () => {
    expect(app.searchTerm()).toBe('');
    expect(app.selectedCard()).toBeNull();
    expect(app.isLoading()).toBe(true);
    expect(app.cards()).toEqual([]);
  });

  it('should open and close card preview modal', () => {
    const card: PokemonCard = { id: 'base1-4', localId: '4', name: 'Charizard' };

    app.openPreview(card);
    expect(app.selectedCard()).toEqual(card);

    app.closePreview();
    expect(app.selectedCard()).toBeNull();
  });

  it('should update search term on search event', () => {
    const mockEvent = {
      target: { value: 'Pikachu' },
    } as unknown as Event;

    app.onSearch(mockEvent);
    expect(app.searchTerm()).toBe('Pikachu');
  });
});
