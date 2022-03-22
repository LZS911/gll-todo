import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  note_id: number;

  @Column({
    length: 100,
  })
  note_title: string;

  @Column({
    length: 100,
  })
  note_content: string;

  @CreateDateColumn()
  create_date: Timestamp;

  @UpdateDateColumn()
  update_date: Timestamp;
}
