import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../core/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      relations: ['office'],
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
      officeId: user.officeId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        officeId: user.officeId,
        office: user.office,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    fullName: string;
    userType: string;
    officeId: string;
  }) {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);

    const user = this.userRepository.create({
      ...userData,
      passwordHash,
      isActive: true,
    });

    await this.userRepository.save(user);

    const { passwordHash: _, ...result } = user;
    return result;
  }
}
