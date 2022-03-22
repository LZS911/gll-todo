import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  plan_id: number;

  @Column({
    length: 100,
  })
  plan_title: string;

  @Column({
    length: 100,
  })
  plan_content: string;

  @Column({
    length: 10,
  })
  plan_status: string;

  @Column({
    length: 100,
  })
  plan_level: string;

  @Column({
    length: 1000,
    nullable: true,
  })
  plan_step?: string;

  @Column({
    type: 'bool',
    nullable: true,
  })
  is_one_day?: boolean;

  @Column({
    type: 'bool',
    nullable: true,
  })
  is_important?: boolean;

  @Column({
    type: 'bool',
    nullable: true,
  })
  is_tips?: boolean;

  @Column({ type: 'date', nullable: true })
  start_time: string;

  @Column({ type: 'date', nullable: true })
  end_time: string;

  @Column({
    type: 'bool',
    nullable: true,
  })
  is_repeat?: boolean;

  @Column({
    type: 'longblob',
    nullable: true,
  })
  file?: Buffer;

  @CreateDateColumn()
  create_date: Timestamp;

  @UpdateDateColumn()
  update_date: Timestamp;
}
