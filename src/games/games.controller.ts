import { Controller, Get, Param, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { GetGamesDto } from './dto/get-games.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getAll(@Query() params: GetGamesDto) {
    return this.gamesService.getAll(params);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    // console.log('getById called with id:', id);
    return this.gamesService.getById(id);
  }
  
}
