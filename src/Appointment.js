const Appointment = {
  async create(req, res) {
    return res.status(200).json({ ok: true });
  },
};

module.exports = Appointment;
