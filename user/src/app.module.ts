import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://172.17.0.7:27017/users', { useNewUrlParser: true }),
    UserModule,
  ],
})
export class AppModule {}
