const express = require('express');

const repairsController = require('./../controllers/repairs.controller');

// MIDDLEWARES

const validationsMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const repairMiddleware = require('../middlewares/repair.middleware');

const { Router } = require('express');
const router = Router();

router
  .route('/')
  .get(
    authMiddleware.protect,
    authMiddleware.restrictTo('employee'),
    repairsController.firstRepairs
  )

  .post(
    validationsMiddleware.createRepairValidation,
    repairsController.createRepair
  );

router
  .use(authMiddleware.protect)
  .use(authMiddleware.restrictTo('employee'))
  .use('/:id', repairMiddleware.validRepair)
  .route('/:id')
  .get(repairsController.firsRepair)
  .patch(authMiddleware.protectAccountOwner, repairsController.updateRepair)
  .delete(authMiddleware.protectAccountOwner, repairsController.deleteRepair);

module.exports = router;
