import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryColumn()
  id: number;

  @Column()
  note: string;

  @Column()
  status: TodoStatus;

  @UpdateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}

export enum TodoStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
