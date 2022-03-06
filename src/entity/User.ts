import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ccd_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;
}
