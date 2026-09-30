import { PokemonCard, PokemonService } from './pokemon.service';

describe('PokemonService (Simple & Trivial Tests)', () => {
  let service: PokemonService;

  const mockCards: PokemonCard[] = [
    { id: 'base1-4', localId: '4', name: 'Charizard' },
    { id: 'base1-2', localId: '2', name: 'Blastoise' },
    { id: 'base1-58', localId: '58', name: 'Pikachu' },
  ];

  beforeEach(() => {
    service = new PokemonService();
  });

  it('should filter cards by name case-insensitively', () => {
    const results = service.filterCards(mockCards, 'pika');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Pikachu');
  });

  it('should filter cards by local ID number', () => {
    const results = service.filterCards(mockCards, '4');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Charizard');
  });

  it('should return all cards when search term is empty', () => {
    const results = service.filterCards(mockCards, '');
    expect(results.length).toBe(3);
  });

  it('should provide fallback cards when offline', () => {
    const fallback = service.getFallbackCards();
    expect(fallback.length).toBeGreaterThan(0);
    expect(fallback[0]).toHaveProperty('name');
  });
});
