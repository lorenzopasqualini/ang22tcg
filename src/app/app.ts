import { Component, OnInit, computed, signal } from '@angular/core';
import { PokemonCard, PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // Component State
  readonly cards = signal<PokemonCard[]>([]);
  readonly searchTerm = signal<string>('');
  readonly selectedCard = signal<PokemonCard | null>(null);
  readonly isLoading = signal<boolean>(true);

  // Derived state: automatically updates when cards or search term changes
  readonly filteredCards = computed(() =>
    this.pokemonService.filterCards(this.cards(), this.searchTerm())
  );

  constructor(protected readonly pokemonService: PokemonService = new PokemonService()) {}

  async ngOnInit(): Promise<void> {
    await this.loadCards();
  }

  async loadCards(): Promise<void> {
    this.isLoading.set(true);
    const fetched = await this.pokemonService.fetchCards();
    this.cards.set(fetched);
    this.isLoading.set(false);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  openPreview(card: PokemonCard): void {
    this.selectedCard.set(card);
  }

  closePreview(): void {
    this.selectedCard.set(null);
  }
}
