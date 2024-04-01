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

import { TrackModel } from './track.model';
import { TrackService } from './track.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard.js';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({summary: 'Get tracks list', description: 'Gets all library tracks list'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary: 'Get single track by id', description: 'Gets single track by id'})
  @ApiResponse({status: HttpStatus.OK, description: 'Successful operation'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. trackId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Track was not found.'})
  async getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary: 'Add new track', description: 'Add new track information'})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.CREATED, description: 'The user has been created'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. body does not contain required fields'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  async CreateTrack(@Body() dto: Omit<TrackModel, 'id'>) {
    return this.trackService.CreateTrack(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({summary: `Update track information`, description: `Update library track information by UUID`})
  @ApiBody({required: true})
  @ApiResponse({status: HttpStatus.OK, description: 'The track has been updated.'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. trackId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Track was not found.'})
  async updateTrackInfo(
    @Param('id') id: string,
    @Body() dto: Omit<TrackModel, 'id'>,
  ) {
    return this.trackService.updateTrackInfo(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({summary: `Delete track`, description: `Delete track from library`})
  @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Deleted successfully'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Bad request. trackId is invalid (not uuid)'})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'Track was not found.'})
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackById(@Param('id') id: string) {
    return this.trackService.deleteTrackById(id);
  }
}
