import Router from 'koa-router';
import imgService from '../services/img';

const img: Router.IMiddleware = async (ctx, next) => {
    const { url } = ctx.query;
    const { body, type } = await imgService({ url });
    ctx.type = type || 'jpeg';
    ctx.body = body;
};

export default img;
