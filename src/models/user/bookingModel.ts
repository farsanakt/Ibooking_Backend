import { Schema, model, Document, Types } from 'mongoose';

interface Booking extends Document {
  user: Types.ObjectId;               
  auditorium: Types.ObjectId;        
  eventTitle: string;                 
  description?: string;               
  bookingDate: Date;                 
  eventDate: Date;                    
  startTime: string;                  
  endTime: string;                    
  status: 'pending' | 'confirmed' | 'cancelled';  
  totalPrice: number;                 
  paymentStatus: 'unpaid' | 'paid' | 'refunded'
  paymentMethod?: string;            
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<Booking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    auditorium: { type: Schema.Types.ObjectId, ref: 'Auditorium', required: true },
    eventTitle: { type: String, required: true },
    description: { type: String },
    bookingDate: { type: Date, default: Date.now },
    eventDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' },
    paymentMethod: { type: String },
  },
  { timestamps: true }
);

export default model<Booking>('Booking', bookingSchema);
