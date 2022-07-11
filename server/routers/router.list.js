const { Router } = require("express");

const router = Router();

const cotroller = require("../controller/controller.list");

router.post("/", cotroller.creatList);

router.get("/", cotroller.getAllLists);

router.put("/:listid", cotroller.updateList);

router.delete("/:listid", cotroller.deleteList);

router.get("/:listid", cotroller.getListById);

module.exports = router;
