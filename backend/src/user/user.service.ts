import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const { email, password } = createUserDto;

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        try {
            const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new this.userModel({
                email,
                password: hashedPassword,
            });

            const result = await newUser.save();
            const { password: _, ...userWithoutPassword } = result.toObject();
            return userWithoutPassword as Omit<User, 'password'>;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }
}
