const db = require("../models");

// Defining methods for the TripsController
module.exports = {
  findAllTrips: function (req, res) {
    db.Trip.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findTripById: function (req, res) {
    db.Trip.findById(req.params.id)
      // .populate("tripExpenses")
      // .exec()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  createTrip: function (req, res) {
    //   console.log(req.body);
    //   db.Trip.create(req.body)
    //     .then((dbModel) => res.json(dbModel))
    //     .catch((err) => res.status(422).json(err));
    // },
    db.Trip.create(req.body)
      .then((dbModel) => {
        db.User.findByIdAndUpdate(
          { _id: req.body.id },
          { $push: { memberOf: dbModel._id } }
        ).then((res) => {
          res.json(dbModel);
        });
      })
      .catch((err) => res.status(422).json(err));
  },

  createExpense: function (req, res) {
     db.Expense.create(req.body)
      .then((dbTrip) => {
        db.Trip.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { tripExpenses: dbTrip._id } }
        ).then((res) => {
          res.json(dbTrip);
        });
      })
      .catch((err) => res.status(422).json(err));
  },
  updateTrip: function (req, res) {
    console.log(req.body);
    db.Trip.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  removeTrip: function (req, res) {
    db.Trip.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
