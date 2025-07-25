import mongoose, { Schema, Document } from 'mongoose';

// TimeSlot Interface
export interface ITimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

// Tariff Interface
export interface ITariff {
  wedding: string;
  reception: string;
}

// Venue Interface
export interface IVenue extends Document {
  name: string;
  address: string;
  phone: string;
  altPhone?: string;
  
  email: string;
  pincode: string;
  cities: string[];
  acType: 'AC' | 'Non-AC' | 'Both';
  seatingCapacity: string;
  diningCapacity: string;
  parkingSlots: string;
  changingRooms: string;
  amenities: string[];
  foodPolicy: string;
  decorPolicy: string;
  tariff: ITariff;
  cancellationPolicy: string;
  stageSize: string;
  images: string[];
  timeSlots: ITimeSlot[];
  auditoriumId?: mongoose.Types.ObjectId; // link to the auditorium owner
}


const timeSlotSchema: Schema = new Schema<ITimeSlot>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  { _id: false }
);


const venueSchema: Schema<IVenue> = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String },
    email: { type: String, required: true },
    pincode: { type: String, required: true },
    cities: { type: [String], required: true },
    acType: { type: String, enum: ['AC', 'Non-AC', 'Both'], required: true },
    seatingCapacity: { type: String, required: true },
    diningCapacity: { type: String, required: true },
    parkingSlots: { type: String, required: true },
    changingRooms: { type: String, required: true },
    amenities: { type: [String], default: [] },
    foodPolicy: { type: String, required: true },
    decorPolicy: { type: String, required: true },
    tariff: {
      wedding: { type: String, required: true },
      reception: { type: String, required: true }
    },
    cancellationPolicy: { type: String, required: true },
    stageSize: { type: String, required: true },
    images: { type: [String], default: [] },
    timeSlots: { type: [timeSlotSchema], required: true },
    auditoriumId: { type: mongoose.Schema.Types.ObjectId, ref: 'AuditoriumUser' }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IVenue>('Venue', venueSchema);
