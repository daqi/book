import Router from "koa-router";
import search from "./routers/search";
import img from "./routers/img";

const router = new Router();

router.get("/search", search);
router.get("/img", img);

export default router;
