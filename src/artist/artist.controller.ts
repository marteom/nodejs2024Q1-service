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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({summary: 'Get all artists', description: 'Get all artists'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get single artist by id', description: 'Gets single artist by id'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. artistId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Artis was not found.'})
  async getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @ApiOperation({summary: 'Add new artist', description: 'Add new artist'})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.CREATED, description: 'The artist has been created'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. body does not contain required fields'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async CreateArtistDto(@Body() dto: Omit<ArtistModel, 'id'>) {
    return this.artistService.CreateArtist(dto);
  }

  @Put(':id')
  @ApiOperation({summary: `Update artist information`, description: `Update artist information by UUID`})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.OK, description: 'The artist has been updated.'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. artistId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Artist was not found.'})
  async updateArtistInfo(
    @Param('id') id: string,
    @Body() dto: Omit<ArtistModel, 'id'>,
  ) {
    return this.artistService.updateArtistInfo(id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary: `Delete artist`, description: `Delete artist from library`})
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. artistId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Artist was not found.'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistById(@Param('id') id: string) {
    return this.artistService.deleteArtistById(id);
  }
}
