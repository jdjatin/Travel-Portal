import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity({name:'refresh_tokens'})
@Unique(['userId'])

export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({name:'user_id'})
  userId: string;

  @Column({name:'refresh_token'})
  refreshToken:string;

  @Column({name:'refresh_token_expires'})
  refreshTokenExpires:Date;  

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;
  
  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

}