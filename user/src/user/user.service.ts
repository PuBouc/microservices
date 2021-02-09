import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async getUsers(): Promise<IUser[]> {
        const users = await this.userModel.find().exec();

        return users;
    }

    async getUser(userId: string): Promise<IUser> {
        const user = await this.getUniqueUser(userId);

        return user;
    }

    async getUserByEmail(email: string): Promise<IUser> {
        const user = await this.userModel.findOne({ email: email }).exec();

        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<IUser> {
        const newUser = await new this.userModel(createUserDTO);

        return newUser.save();
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();

        if (result.n === 0) {
            throw new NotFoundException('User not found!');
        }

        return true;
    }

    private async getUniqueUser(userId: string): Promise<IUser> {
        let user;

        try {
            user = await this.userModel.findById(userId).exec();
        } catch (error) {
            throw new NotFoundException('User does not exist!');
        }

        if (!user) {
            throw new NotFoundException('User does not exist!');
        }

        return user;
    }
}
