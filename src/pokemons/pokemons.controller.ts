import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonsService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonsService.findAll();
  }

  @Get(':search')
  findOne(@Param('search') search: string) {
    return this.pokemonsService.findOne(search);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonsService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonsService.remove(id);
  }

  @Delete('term/:term')
  removeBy(@Param('term') term: string) {
    return this.pokemonsService.removeBy(term);
  }
}
