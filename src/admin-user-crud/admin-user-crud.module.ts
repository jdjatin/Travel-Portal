import { Module } from '@nestjs/common';
import { AdminUserCrudService } from './admin-user-crud.service';
import { AdminUserCrudController } from './admin-user-crud.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    // AuthModule,
    // UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AdminUserCrudController],
  providers: [AdminUserCrudService]
})
export class AdminUserCrudModule {}
