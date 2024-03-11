import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ArtistModel } from './artist.model';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async CreateArtistDto(@Body() dto: Omit<ArtistModel, 'id'>) {
    return this.artistService.CreateArtist(dto);
  }

  @Put(':id')
  async updateArtistInfo(
    @Param('id') id: string,
    @Body() dto: Omit<ArtistModel, 'id'>,
  ) {
    return this.artistService.updateArtistInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistById(@Param('id') id: string) {
    return this.artistService.deleteArtistById(id);
  }
}
