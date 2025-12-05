const express = require('express');
const {
  updateUserPluginsController,
  resendVerificationController,
  getTermsStatusController,
  acceptTermsController,
  verifyEmailController,
  deleteUserController,
  getUserController,
  listUsersController,
  getUserMemoriesController,
  updateUserRoleController,
  deleteUserByIdController,
} = require('~/server/controllers/UserController');
const { requireJwtAuth, canDeleteAccount, verifyEmailLimiter } = require('~/server/middleware');
const requireAdmin = require('~/server/middleware/roles/admin');

const router = express.Router();

router.get('/', requireJwtAuth, getUserController);
router.get('/list', requireJwtAuth, requireAdmin, listUsersController);
router.get('/terms', requireJwtAuth, getTermsStatusController);
router.get('/:userId/memories', requireJwtAuth, requireAdmin, getUserMemoriesController);
router.patch('/:userId/role', requireJwtAuth, requireAdmin, updateUserRoleController);
router.delete('/:userId', requireJwtAuth, requireAdmin, deleteUserByIdController);
router.post('/terms/accept', requireJwtAuth, acceptTermsController);
router.post('/plugins', requireJwtAuth, updateUserPluginsController);
router.delete('/delete', requireJwtAuth, canDeleteAccount, deleteUserController);
router.post('/verify', verifyEmailController);
router.post('/verify/resend', verifyEmailLimiter, resendVerificationController);

module.exports = router;
