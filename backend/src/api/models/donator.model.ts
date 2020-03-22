import { Schema, Document, model } from 'mongoose';

export interface IDonatorDocument extends Document {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zip: number;
  email: string;
  location: {
    type: string;
    coordinates: [number];
  };
  distance: number;
  timeSlots: { date: Date, from: string, till: string };
}

// Schema for the mongoose model
const DonatorSchema: Schema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: Number,
  },
  email: {
    type: String,
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
  distance: {
    type: Number,
  },
  timeSlots: {
    type: Array,
  },
});

// Bind Schema with User Collection and define Response Value to IUserDocument
const Donator = model<IDonatorDocument>('Donator', DonatorSchema);

export { Donator };
