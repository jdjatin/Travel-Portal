import { Module } from '@nestjs/common';
import { TravelerCrudService } from './traveler-crud.service';
import { TravelerCrudController } from './traveler-crud.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelerCrud } from './entities/traveler-crud.entity';

@Module({  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forFeature([TravelerCrud])
],
  controllers: [TravelerCrudController],
  providers: [TravelerCrudService]
})
export class TravelerCrudModule {}
