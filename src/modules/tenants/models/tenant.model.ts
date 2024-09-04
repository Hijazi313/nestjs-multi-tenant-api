import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class Tenant extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  tenantId: string;

  @Prop({ required: true, unique: true })
  encryptedSecret: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
