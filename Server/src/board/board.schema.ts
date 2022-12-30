import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
  @Prop()
  id: string;
  @Prop()
  name: string;

  @Prop()
  state: string;
  @Prop()
  timestamp: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
