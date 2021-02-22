const db = require('../db');

const SalonModel = db.salonModel;

exports.getAllSalons = async (req, res) => {
  try {
    const salonsList = await SalonModel.find({});
    res.status(200).send({ salonsList });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.createSalon = async (req, res) => {
  try {
    const data = req.body.data;

    if (!data || !data.name.length || !data.locationInfo) {
      res.status(400).send({ message: 'Data is not entered!' });
      return;
    }

    const salon = new SalonModel({
      name: data.name,
      locationInfo: data.locationInfo,
    });

    const salonDoc = await salon.save();
    console.log(salonDoc);
    res.status(200).send({ message: 'Salon added!' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
