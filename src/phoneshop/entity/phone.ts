import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tblphone', { schema: '' })
export class Phone extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id!: number;

  @Column('varchar', { name: 'name', length: 255 })
  name!: string;

  @Column('smallint', { name: 'category', nullable: true })
  category!: number;

  @Column('smallint', { name: 'price', nullable: true })
  price!: number;

  @DeleteDateColumn()
  deletedAt?: Date;
}
