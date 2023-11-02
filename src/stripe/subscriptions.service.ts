
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class SubscriptionsService {
    private stripe: Stripe;

    constructor(
        private readonly stripeService: StripeService,
        private readonly configService: ConfigService
    ) {
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: null,
        });
    }

    public async createMonthlySubscription(customerId: string) {
        const priceId = this.configService.get('MONTHLY_SUBSCRIPTION_PRICE_ID');

        const subscriptions = await this.stripeService.listSubscriptions(priceId, customerId);
        if (subscriptions.data.length) {
            throw new BadRequestException('Customer already subscribed');
        }
        return this.stripeService.createSubscription(priceId, customerId);
    }

    public async getMonthlySubscription(customerId: string) {
        const priceId = this.configService.get('MONTHLY_SUBSCRIPTION_PRICE_ID');
        const subscriptions = await this.stripeService.listSubscriptions(priceId, customerId);

        if (!subscriptions.data.length) {
            return new NotFoundException('Customer not subscribed');
        }
        return subscriptions.data[0];
    }

    public async listSubscriptions(priceId: string, customerId: string,) {
        return this.stripe.subscriptions.list({
            customer: customerId,
            price: priceId,
            expand: ['data.latest_invoice', 'data.latest_invoice.payment_intent']
        })
    }
}