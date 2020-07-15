import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import Customer from './Customer';
import Product from './Product';

@Entity('service_orders')
export default class ServiceOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  owner_id: number;
  @OneToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  operator_id: number;
  @OneToOne(() => User)
  @JoinColumn({ name: 'operator_id' })
  operator: User;

  @Column()
  customer_id: number;
  @OneToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  product_id: number;
  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ enum: ['P', 'A', 'D'], default: 'P' })
  status: string;

  @Column()
  diagnosis: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
