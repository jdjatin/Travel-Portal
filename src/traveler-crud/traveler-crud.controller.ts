import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { TravelerCrudService } from './traveler-crud.service';
import { CreateTravelerCrudDto } from './dto/create-traveler-crud.dto';
import { UpdateTravelerCrudDto } from './dto/update-traveler-crud.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('traveler-crud')
export class TravelerCrudController {
  constructor(private readonly travelerCrudService: TravelerCrudService) {}


  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() createTravelerCrudDto: CreateTravelerCrudDto,
   @Request() req
  ) {
    let userId = { userId: req.user.id };
    return this.travelerCrudService.create(createTravelerCrudDto, userId);
  }




  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get()
  async findOne(@Request() req) {
    let userId= {userId:req.user.id}
    console.log(userId)
    return await this.travelerCrudService.findOne(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelerCrudDto: UpdateTravelerCrudDto,
  @Request() req
  ) {
    let userId= {userId:req.user.id}
    
    return this.travelerCrudService.update(+id, updateTravelerCrudDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    let userId= {userId:req.user.userId}
    return this.travelerCrudService.remove(+id, userId);
  }
}
