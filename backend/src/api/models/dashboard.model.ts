import { Schema, Document, model } from 'mongoose';
export interface IKpi {
  date: Date;
}

export interface IBlumo extends Document {
  date: Date;
  radius: number;
  location: Location;
  till: string;
  from: string;
  publish: string;
}

export interface Location extends Document {
  coordinates: Array<Number>;
  type: string;
}

const BlumoSchema: Schema = new Schema({
  date: {
    type: String,
    required: false
  },
  radius: {
    type: Number,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  till: {
    type: String,
    required: false
  },
  from: {
    type: String,
    required: false
  },
  publish: {
    type: String,
    required: false
  }
});

const Blumo = model<IBlumo>('Blumo', BlumoSchema);

export { Blumo };
