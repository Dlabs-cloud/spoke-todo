import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  status: TodoStatus;

  @Column({ default: 'false', type: 'bool' })
  isDeleted = false;

  @UpdateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}

export enum TodoStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}