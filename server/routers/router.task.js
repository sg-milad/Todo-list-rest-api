const { Router } = require("express");

const router = Router();

const controller = require("../controller/controller.task");

/**
 * GET /lists/:listId/tasks
 * Get all tasks in a specific list
 */
router.get("/:listid/tasks", controller.getAllTasks);

/**
 * POST /lists/:listId/tasks
 * Create a new task in a specific list
 */
router.post("/:listid/tasks", controller.creatTask);

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Update an existing task
 */
router.put("/:listid/task/:taskid", controller.updateTask);

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Delete a task
 */
router.delete("/:listid/task/:taskid", controller.deleteTask);

module.exports = router;
