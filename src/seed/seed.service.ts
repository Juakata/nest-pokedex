import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { PokemonsService } from 'src/pokemons/pokemons.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonsService,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

  async runSeed() {
    const { results } = await this.axiosAdapter.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1000',
    );
    await this.pokemonService.removeAll();
    const pokemons = results.map((pokemon) => {
      const { name, url } = pokemon;
      const urlArr = url.split('/');
      const no: number = +urlArr[6];

      return { name, no };
    });

    await this.pokemonService.createBulk(pokemons);

    return 'Seed ran!';
  }
}
