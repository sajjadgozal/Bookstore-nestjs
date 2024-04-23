import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { usersSeed } from './user.seed';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const item: User = new User();
    item.name = createUserDto.name;
    item.email = createUserDto.email;
    item.role = createUserDto.role;

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    item.password = hashedPassword;

    return this.repo.save(item);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const item: User = new User();
    item.name = updateUserDto.name;
    item.email = updateUserDto.email;

    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    item.password = hashedPassword;

    item.role = updateUserDto.role;
    item.id = id;
    return this.repo.save(item);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.repo.delete(id);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.repo.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.name, email: user.email, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return new UnauthorizedException();
  }

  async seed() {
    await this.repo.save(usersSeed);
  }
}
