import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  runSeed() {
    return 'Data base has been feed!';
  }
}
