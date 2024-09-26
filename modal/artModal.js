import mongoose, { Schema } from 'mongoose';

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


const ArtModel = mongoose.models.Art || mongoose.model('Art', ArtsSchema);

export default ArtModel;