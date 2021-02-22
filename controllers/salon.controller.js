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
    const name = req.body.name;
    const locationInfo = req.body.locationInfo;

    if (!name.length || !locationInfo) {
      res.status(400).send({ message: 'Data is invalid!' });
      return;
    }

    const salon = new SalonModel({
      name,
      locationInfo,
    });

    await salon.save();
    res.status(200).send({ message: 'Salon added!' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
