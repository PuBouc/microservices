import { Body, Controller, Delete, Get, Logger, Param, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AllowAnon } from 'src/shared/decorators/allow-anon.decorator';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id.pipes';
import { CreateUserDTO } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('identity')
export class UserController {
    constructor(private userService: UserService) {}

    @MessagePattern({ role: 'user', cmd: 'get' })
    get(data: any): Promise<IUser> {
        Logger.log(data);
        return this.userService.getUserByEmail(data.email);
    }

    @Get('/users')
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get('/user/:id')
    async getUser(@Param('id', new ValidateObjectId()) userId: string) {
        return await this.userService.getUser(userId);
    }

    @AllowAnon()
    @Post('/user')
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        return {
            'message': 'User has been successfully created!',
            'user': await this.userService.createUser(createUserDTO),
        };
    }

    @Delete('/user/:id')
    async deleteUser(@Param('id', new ValidateObjectId()) userId) {
        const isDeleted = await this.userService.deleteUser(userId);

        if (isDeleted) {
            return {
                'message': 'User deleted successfully!'
            };
        }
    }
}
