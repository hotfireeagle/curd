import { Entity, Column, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';
import crypto from 'crypto';

@Entity()
export class User {
    @ObjectIdColumn()
    public _id: ObjectID;

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        default: ''
    })
    public name: string;

    @Column({
        default: crypto.createHmac('sha256', 'default_secret')
                .update('i')
                .digest('hex')
    })
}