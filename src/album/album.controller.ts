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

import { AlbumModel } from './album.model';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  async CreateAlbum(@Body() dto: Omit<AlbumModel, 'id'>) {
    return this.albumService.CreateAlbum(dto);
  }

  @Put(':id')
  async updateAlbumInfo(
    @Param('id') id: string,
    @Body() dto: Omit<AlbumModel, 'id'>,
  ) {
    return this.albumService.updateAlbumInfo(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumById(@Param('id') id: string) {
    return this.albumService.deleteAlbumById(id);
  }
}
