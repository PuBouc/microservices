import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { timeout, catchError } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_CLIENT')
        private readonly client: ClientProxy,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.client.send({ role: 'user', cmd: 'get' }, { email })
            .pipe(
                timeout(5000),
                catchError(err => {
                    if (err instanceof TimeoutError) {
                        return throwError(new RequestTimeoutException());
                    }

                    return throwError(err);
                })
            )
            .toPromise();

            if (user && bcrypt.compare(password, user?.password)) {
                const { password, ...result } = user;
                
                return result;
            }

            return null;
        } catch(e) {
            Logger.log(e);

            throw e;
        }
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user._id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    
    async validateToken(jwt: string) {
        return this.jwtService.verify(jwt);
    }
}
