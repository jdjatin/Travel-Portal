import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { AdminPanelController } from './admin-panel.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelBookings } from '../flight-booking/entities/bookingToken.entity';
import { User } from '../users/entities/user.entity';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';

@Module({
  imports: [AdminAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([TravelBookings,User])
  ],
  providers: [AdminPanelService],
  controllers: [AdminPanelController]
})
export class AdminPanelModule {}
