
import express from 'express'
const location=express.Router()

location.get('/location/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
      const location = await Location.findOne({ customerId });
      res.json(location);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  export default location;