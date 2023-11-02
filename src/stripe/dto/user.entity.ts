import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ unique: true })
  email: string;
 
  @Column()
  name: string;
 
  @Column()
  @Exclude()
  password: string;
 
  @Column()
  stripeCustomerId: string;
}
 
export default User;