import { CanActivate, ExecutionContext, Inject, Logger } from "@nestjs/common";
import { timeout } from 'rxjs/operators';
import { ClientProxy } from "@nestjs/microservices";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/shared/decorators/allow-anon.decorator";

export class AuthGuard implements CanActivate {
    constructor(
        @Inject('AUTH_CLIENT')
        private readonly client: ClientProxy,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest();

        Logger.log(req.headers['authorization']?.split(' ')[1]);
        try {
            const res = await this.client.send(
                { role: 'auth', cmd: 'check' },
                { jwt: req.headers['authorization']?.split(' ')[1] }
            )
            .pipe(timeout(5000))
            .toPromise<boolean>();

            return res;
        } catch(e) {
            Logger.log(e);

            return false;
        }
    }
}