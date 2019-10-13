const Appointment = require('../Appointment/Appointment');

module.exports = {
  async create(req, res) {
    const [error, appnt] = await Appointment.create(req.body);
    if (error) {
      return res.status(400).json(error);
    } else {
      return res.status(200).json(appnt);
    }
  },
};
