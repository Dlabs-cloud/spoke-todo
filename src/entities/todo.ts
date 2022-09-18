import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryColumn()
  id: number;

  @Column()
  note: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @UpdateDateColumn()
  createdAt: Date;
}
