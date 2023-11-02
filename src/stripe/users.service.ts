import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './dto/user.entity';
import CreateUserDto from './dto/user.entity';
import StripeService from '../stripe/stripe.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private stripeService: StripeService
  ) { }

  async createUser(userData: CreateUserDto) {
    const stripeCustomer = await this.stripeService.createCustomer(userData.name, userData.email);

    const newUser = this.usersRepository.create({ ...userData, stripeCustomerId: stripeCustomer.id });
    await this.usersRepository.save(newUser);
    return newUser;
  }
}