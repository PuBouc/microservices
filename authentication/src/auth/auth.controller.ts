import { Controller, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({ role: 'auth', cmd: 'check' })
    async validate(data) {
        Logger.log(data);
        try {
            const res = await this.authService.validateToken(data.jwt);

            return res;
        } catch(e) {
            Logger.log(e);
            
            return false;
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }
}
