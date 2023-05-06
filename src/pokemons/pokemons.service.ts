import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemons`;
  }

  async findOne(search: string) {
    let pokemon: Pokemon;

    if (!isNaN(+search)) {
      pokemon = await this.pokemonModel.findOne({ no: search });
    } else if (isValidObjectId(search)) {
      pokemon = await this.pokemonModel.findById(search);
    } else {
      pokemon = await this.pokemonModel.findOne({ name: search });
    }

    if (!pokemon)
      throw new NotFoundException(`Pokemon with ${search} key, not found!`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const pokemon = await this.findOne(id);
    await pokemon.deleteOne();

    return pokemon;
  }

  async removeBy(term: string) {
    const pokemon = await this.findOne(term);
    await pokemon.deleteOne();

    return pokemon;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      const entries = Object.entries(error.keyValue);
      throw new BadRequestException(
        `Pokemon with ${entries[0][0]}: ${entries[0][1]} already exist`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Unable to save pokemon - please check server logs',
    );
  }
}
