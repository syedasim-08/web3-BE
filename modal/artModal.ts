import mongoose, { Schema } from 'mongoose';


interface IArt extends Document {
  name: string;
  minting: string;
  price: number;
  imgUrl: string;
  description: string
  link: string
  createdAt: Date
}



const ArtsSchema = new Schema({
  name: { type: String, required: true },
  minting: { type: String },
  price: { type: String },
  imgUrl: { type: String },
  description: { type: String },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }

},
{
  timestamps: true 
}
);


const ArtModel = mongoose.models.Art || mongoose.model<IArt>('Art', ArtsSchema);

export default ArtModel;