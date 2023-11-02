import { Controller, Post, Body, Get } from '@nestjs/common';
import SubscriptionsService from './subscriptions.service';
import User from './dto/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('subscriptions')
export default class SubscriptionsController {
    constructor(
        private readonly subscriptionsService: SubscriptionsService,
        private readonly configService: ConfigService
    ) { }

    @Post('monthly')
    async createMonthlySubscription(@Body() user: User) {
        return this.subscriptionsService.createMonthlySubscription(user.stripeCustomerId);
    }

    @Get('monthly')
    async getMonthlySubscription(@Body() user: User) {
        return this.subscriptionsService.getMonthlySubscription(user.stripeCustomerId);
    }

    @Get('list')
    async listSubscriptions(@Body() user: User) {
        const priceId = this.configService.get('MONTHLY_SUBSCRIPTION_PRICE_ID');
        return this.subscriptionsService.listSubscriptions(priceId, user.stripeCustomerId);
    }
}