import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Knowledge {
  @PrimaryGeneratedColumn()
  knowledge_id: number;

  @Column({
    length: 100,
  })
  knowledge_title: string;

  @Column({
    length: 100,
  })
  knowledge_content: string;

  @CreateDateColumn()
  create_date: Timestamp;

  @UpdateDateColumn()
  update_date: Timestamp;
}
