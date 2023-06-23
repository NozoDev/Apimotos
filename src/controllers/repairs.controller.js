const Repair = require('../models/repair.model');
const Users = require('../models/user.modal');
const catchAsync = require('../utils/catchAsync');

exports.firstRepairs = catchAsync(async (req, res, next) => {
  const time = req.requesTime;

  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    attributes: {
      exclude: ['status'],
    },
  });

  return res.json({
    requesTime: time,
    status: 'sucess',
    results: repairs.lenght,
    repairs,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description } = req.body;
  const { id } = req.sessionUser;

  const repair = await Repair.create({
    date,
    motorsNumber: motorsNumber.toLowerCase(),
    description,
    userId: id,
  });

  res.status(201).json({
    message: 'Motorcycle repair created successfully',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res) => {
  const { repair, user } = req;

  const updatedRepair = await repair.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'Repair updated',
    repair: updatedRepair,
    user,
  });
});

exports.firsRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Repair Found😚',
    repair,
  });
});

exports.deleteRepair = async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled😪' });

  res.status(200).json({
    status: 'success',
    message: `repair with id:${repair.id} has been deleted`,
  });
};
