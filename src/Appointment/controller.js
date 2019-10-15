const Appointment = require('../Appointment/Appointment');

module.exports = {
  async create(req, res) {
    try {
      //const appnt = await Appointment.create(req.body);
      const [error, appnt] = await Appointment.create(req.body);
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(appnt);
      }
    } catch (error) {
      //console.log(error.message);
      res.status(500).json({ error: 'server error' });
    }
  },

  async findAll(req, res) {
    try {
      const [error, appnt] = await Appointment.listAll();
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(appnt);
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'server error' });
    }
  },

  async remove(req, res) {
    try {
      const [error, appnt] = await Appointment.remove(req.body);
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(appnt);
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'server error' });
    }
  },

  async getInterval(req, res) {
    try {
      const [error, appnt] = await Appointment.getInterval(req.body);
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(appnt);
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'server error' });
    }
  },
};
