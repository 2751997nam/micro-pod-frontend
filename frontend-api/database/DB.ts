import * as mongoose from "mongoose";

import configDB from '~/config/database';

export async function connectToDB() {
    console.log('connecting to DB', `mongodb://${configDB().user}:${configDB().password}@${configDB().host}:${configDB().port}/${configDB().name}`);
    await mongoose.connect(`mongodb://${configDB().user}:${configDB().password}@${configDB().host}:${configDB().port}/${configDB().name}?authSource=admin`);
    console.log('connected to DB');
}
