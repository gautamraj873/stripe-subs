import { Body, Controller, Post, Get, HttpCode } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import AddCreditCardDto from './dto/addCreditCard.dto';
import CreateChargeDto from './dto/createCharge.dto';
import SetDefaultCreditCardDto from './dto/setDefaultCreditCard.dto';
import User from './dto/user.entity';

@Controller('credit-cards')
export default class CreditCardsController {
  constructor(
    private readonly stripeService: StripeService
  ) { }

  @Post()
  async addCreditCard(@Body() creditCard: AddCreditCardDto, user: User) {
    return this.stripeService.attachCreditCard(creditCard.paymentMethodId, user.stripeCustomerId);
  }

  @Get()
  async getCreditCards(@Body() user: User) {
    return this.stripeService.listCreditCards(user.stripeCustomerId);
  }

  @Post()
  async createCharge(@Body() charge: CreateChargeDto, user: User) {
    return this.stripeService.charge(charge.amount, charge.paymentMethodId, user.stripeCustomerId);
  }

  @Post('default')
  @HttpCode(200)
  async setDefaultCard(@Body() creditCard: SetDefaultCreditCardDto, user: User) {
    await this.stripeService.setDefaultCreditCard(creditCard.paymentMethodId, user.stripeCustomerId);
  }
}