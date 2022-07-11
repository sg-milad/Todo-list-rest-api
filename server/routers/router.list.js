const { Router } = require("express");

const router = Router();

const cotroller = require("../controller/controller.list");

/**
 * POST /lists
 * Create a list
 */
router.post("/", cotroller.creatList);

/**
 * GET /lists
 * Get all lists
 */
router.get("/", cotroller.getAllLists);

/**
 * Put /lists/:id
 * Update a specified list
 */
router.put("/:listid", cotroller.updateList);

/**
 * DELETE /lists/:id
 * Delete a list
 */
router.delete("/:listid", cotroller.deleteList);

/**
 * get  /lists/:id
 * get specifie list
 */
router.get("/:listid", cotroller.getListById);

module.exports = router;
