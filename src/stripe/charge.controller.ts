import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import CreateChargeDto from './dto/createCharge.dto';
import StripeService from './stripe.service';
import User from './dto/user.entity';
 
@Controller('charge')
export default class ChargeController {
  constructor(
    private readonly stripeService: StripeService
  ) {}
 
  @Post()
  async createCharge(@Body() charge: CreateChargeDto, user: User) {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, user.stripeCustomerId);
  }
}