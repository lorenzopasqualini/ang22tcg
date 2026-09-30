import { Injectable } from '@angular/core';

export interface PokemonCard {
  id: string;
  localId: string;
  name: string;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // Official Base Set cards from public community TCG API
  readonly apiUrl = 'https://api.tcgdex.net/v2/en/sets/base1';

  async fetchCards(): Promise<PokemonCard[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const rawCards = (data && data.cards) || [];

      return rawCards.map((card: { id: string; localId: string; name: string; image?: string }) => ({
        id: card.id,
        localId: card.localId,
        name: card.name,
        image: card.image ? `${card.image}/high.webp` : undefined,
      }));
    } catch {
      // Fallback to offline cards so the board always displays reliably
      return this.getFallbackCards();
    }
  }

  filterCards(cards: PokemonCard[], term: string): PokemonCard[] {
    const cleanTerm = term.trim().toLowerCase();
    if (!cleanTerm) {
      return cards;
    }
    return cards.filter(
      (card) =>
        card.name.toLowerCase().includes(cleanTerm) ||
        card.localId.toLowerCase().includes(cleanTerm)
    );
  }

  getFallbackCards(): PokemonCard[] {
    return [
      {
        id: 'base1-4',
        localId: '4',
        name: 'Charizard',
        image: 'https://assets.tcgdex.net/en/base/base1/4/high.webp',
      },
      {
        id: 'base1-2',
        localId: '2',
        name: 'Blastoise',
        image: 'https://assets.tcgdex.net/en/base/base1/2/high.webp',
      },
      {
        id: 'base1-15',
        localId: '15',
        name: 'Venusaur',
        image: 'https://assets.tcgdex.net/en/base/base1/15/high.webp',
      },
      {
        id: 'base1-58',
        localId: '58',
        name: 'Pikachu',
        image: 'https://assets.tcgdex.net/en/base/base1/58/high.webp',
      },
      {
        id: 'base1-1',
        localId: '1',
        name: 'Alakazam',
        image: 'https://assets.tcgdex.net/en/base/base1/1/high.webp',
      },
      {
        id: 'base1-10',
        localId: '10',
        name: 'Mewtwo',
        image: 'https://assets.tcgdex.net/en/base/base1/10/high.webp',
      },
    ];
  }
}
