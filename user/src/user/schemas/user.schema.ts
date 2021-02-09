import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        this['password'] = await bcrypt.hash(this['password'], Number(process.env.HASH_SALT));

        return next();
    } catch(err) {
        return next(err);
    }
})