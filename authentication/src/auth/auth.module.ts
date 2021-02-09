import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'USER_CLIENT',
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 4010,
            }
        }]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [
        AuthService, 
        LocalStrategy, 
        JwtStrategy
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {}
