import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Business extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  user: string;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
