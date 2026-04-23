import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true });

const SliderModel = mongoose.model("Slider", sliderSchema);
export default SliderModel;