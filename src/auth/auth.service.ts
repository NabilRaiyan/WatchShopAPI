import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt';

export interface SignInResponse {
  user: { user_id: number; user_name: string; user_email: string };
  accessToken: string;
}

// Auth service
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  // Sign up method
  async signUp(authDto: AuthDto): Promise<SignInResponse> {
    const isUserExist = await this.userRepository.findOne({
      where: {
        email: authDto.email,
      },
    });

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    // Create a new UserEntity instance
    const user = new UserEntity();
    user.email = authDto.email;
    user.name = authDto.name;
    user.isAdmin = false;
    user.isReset = false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(authDto.password, salt);

    const newUser = await this.userRepository.save(user);

    const payload = { userId: newUser.id, email: newUser.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: {
        user_id: newUser.id,
        user_name: newUser.name,
        user_email: newUser.email,
      },
      accessToken,
    };
  }

  // Sign in method
  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    // creating access token
    const payload = { userId: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: { user_id: user.id, user_name: user.name, user_email: user.email },
      accessToken,
    };
  }
}
