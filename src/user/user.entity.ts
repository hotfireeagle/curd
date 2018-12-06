import { Entity, Column, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@Entity()
export class User {
    @ObjectIdColumn()
    public _id: ObjectID;

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        default: ''
    })
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Column({
        default: crypto.createHmac('sha256', 'default_secret')
                .update('i')
                .digest('hex')
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    public password: string
}