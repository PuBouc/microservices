import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AuthGuard } from 'src/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 4000
      }
    }])
  ],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [
    UserController
  ]
})
export class UserModule {}
