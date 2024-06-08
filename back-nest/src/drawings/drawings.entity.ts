import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Drawings {
  @PrimaryGeneratedColumn()
  id_drawing: number;

  @Column()
  drawing: string;
}
