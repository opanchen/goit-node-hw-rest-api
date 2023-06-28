const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../schemas");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
