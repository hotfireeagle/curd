import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readyonly userModel: Model<>) {}
    
}