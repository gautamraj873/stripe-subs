import { IsString, IsNotEmpty } from 'class-validator';
 
export class SetDefaultCreditCardDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsString()
  @IsNotEmpty()
  stripeCustomerId: string;
}
 
export default SetDefaultCreditCardDto;