import Router from "koa-router";
import search from "./routers/search";

const router = new Router();

router.get("/search", search);

export default router;
