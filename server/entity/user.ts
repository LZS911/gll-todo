import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    length: 100,
  })
  user_name: string;

  @Column({
    length: 100,
  })
  user_pic: string;

  @CreateDateColumn()
  createDate: Timestamp;

  @UpdateDateColumn()
  updateDate: Timestamp;
}
