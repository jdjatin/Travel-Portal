import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminUserCrudService } from './admin-user-crud.service';
import { CreateUsersDto } from './dto/createUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Admin-User-crud')
@Controller('admin-user-crud')
export class AdminUserCrudController {
  constructor(private readonly adminUserCrudService: AdminUserCrudService) {}

  @Post()
  create(@Body() createAdminUserCrudDto:CreateUsersDto) {
    return this.adminUserCrudService.create(createAdminUserCrudDto);
  }

  @Get()
  findAll() {
    return this.adminUserCrudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.adminUserCrudService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateAdminUserCrudDto:UpdateUserDto) {
    return this.adminUserCrudService.update(id, updateAdminUserCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.adminUserCrudService.remove(id);
  }
}
