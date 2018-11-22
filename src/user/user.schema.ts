/**
 *  用户建模
 */

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Scheme({
    name: String,
    email: String,
    password: String
});