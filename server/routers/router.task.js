const { Router } = require("express");

const router = Router();

const controller = require("../controller/controller.task");

router.get("/:listid/tasks", controller.getAllTasks);

router.post("/:listid/tasks", controller.creatTask);

router.put("/:listid/task/:taskid", controller.updateTask);

router.delete("/:listid/task/:taskid", controller.deleteTask);

module.exports = router;
