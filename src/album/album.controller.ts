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
  UseGuards,
} from '@nestjs/common';

import { AlbumModel } from './album.model';
import { AlbumService } from './album.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary: 'Get albums list', description: 'Gets all library albums list'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary: 'Get single album by id', description: 'Gets single album by id'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. albumId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Album was not found.'})
  async getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary: 'Add new album', description: 'Add new album information'})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.CREATED, description: 'Album is created'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. body does not contain required fields'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async CreateAlbum(@Body() dto: Omit<AlbumModel, 'id'>) {
    return this.albumService.CreateAlbum(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({summary: `Update album information`, description: `Update library album information by UUID`})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.OK, description: 'The album has been updated.'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. albumId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Album was not found.'})
  async updateAlbumInfo(
    @Param('id') id: string,
    @Body() dto: Omit<AlbumModel, 'id'>,
  ) {
    return this.albumService.updateAlbumInfo(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({summary: `Delete album`, description: `Delete album from library`})
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. albumId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Album was not found.'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumById(@Param('id') id: string) {
    return this.albumService.deleteAlbumById(id);
  }
}
