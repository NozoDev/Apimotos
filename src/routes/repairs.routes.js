const express = require('express');

const repairsController = require('./../controllers/repairs.controller');

// MIDDLEWARES

const validationsMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const repairMiddleware = require('../middlewares/repair.middleware');
const { router } = express.Router();
const router = Router();

router
  .route('/')
  .get(repairsController.firstRepairs)
  .post(repairsController.createRepair);

router
  .route('/:id')
  .get(repairsController.firsRepair)
  .patch(repairsController.updateRepair)
  .delete(repairsController.deleteRepair);

module.exports = router;
