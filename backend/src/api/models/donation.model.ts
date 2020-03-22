import { Schema, Document, model } from 'mongoose';

export interface IDonationDocument extends Document {
  region: string;
  strasse: string;
  plz: string;
  ort: string;
  datum: string;
  uhrzeit_von: string;
  uhrzeit_bis: string;
  location: {
    type: string;
    coordinates: [number];
  };
}


// Schema for the mongoose model
const DonationSchema: Schema = new Schema({
  region: {
    type: String,
  },
  strasse: {
    type: String,
  },
  plz: {
    type: String,
  },
  ort: {
    type: String,
  },
  datum: {
    type: String,
  },
  uhrzeit_von: {
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
  uhrzeit_bis: {
    type: String,
  }
});

// Bind Schema with User Collection and define Response Value to IUserDocument
const Donation = model<IDonationDocument>('Donation', DonationSchema);

export { Donation };
