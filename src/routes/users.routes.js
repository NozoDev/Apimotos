const usersController = require('../controllers/users.controller');

const usersMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const { Router } = require('express');
const router = Router();

router
  .route('/')
  .get(authMiddleware.protect, usersController.findUsers)
  .post(validationMiddleware.createUserValidation, usersController.createUser);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  usersController.login
);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .get(usersMiddleware.validUser, usersController.firsUser)
  .patch(
    usersMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    usersController.updateUser
  )
  .delete(
    usersMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    usersController.deleteUser
  );

module.exports = router;
