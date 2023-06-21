const Repair = require('../models/repair.model');
const Users = require('../models/user.modal');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: Users,
        attributes: ['id', 'name', 'email', 'role'],
      },
    ],
  });

  if (!repair) {
    const completedRepair = await Repair.findOne({
      where: {
        id,
        status: 'completed',
      },
    });

    if (completedRepair) {
      return res.status(404).json({
        status: 'error',
        message: `the repair with id:${id} cannot be canceled beacuse ir has already been completed😏`,
      });
    }

    return next(new AppError(`repair with id:${id} was not found 😫😪`, 404));
  }

  req.user = repair.user;
  req.repair = repair;
  next();
});
