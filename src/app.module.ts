import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonsModule } from './pokemons/pokemons.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvValidationSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: EnvValidationSchema }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      renderPath: '/',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PokemonsModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
