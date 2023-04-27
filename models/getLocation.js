import express from 'express'
import  mongoose from 'mongoose';


mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const locationSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});


const Location = mongoose.model('Location', locationSchema);