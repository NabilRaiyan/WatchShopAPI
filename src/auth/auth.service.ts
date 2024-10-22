import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signinDto';

// Auth service
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Sign up method
  async signUp(authDto: AuthDto): Promise<UserEntity> {
    const isUserExist = await this.userRepository.findOne({
      where: {
        email: authDto.email,
      },
    });

    if (isUserExist) {
      throw new ConflictException('User already exist');
    }

    // Create a new UserEntity instance
    const user = new UserEntity();
    user.email = authDto.email;
    user.name = authDto.name;
    user.isAdmin = false;
    user.isReset = false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(authDto.password, salt);

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    delete newUser.password;

    return newUser;
  }

  // Sign in method

  async SignIn(signInDto: SignInDto): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return user;
  }
}
