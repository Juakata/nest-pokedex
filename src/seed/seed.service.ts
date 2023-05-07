import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { PokemonsService } from 'src/pokemons/pokemons.service';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonsService) {}

  async runSeed() {
    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000',
    );
    await this.pokemonService.removeAll();
    const pokemons = data.results.map((pokemon) => {
      const { name, url } = pokemon;
      const urlArr = url.split('/');
      const no: number = +urlArr[6];

      return { name, no };
    });

    await this.pokemonService.createBulk(pokemons);

    return 'Seed ran!';
  }
}
