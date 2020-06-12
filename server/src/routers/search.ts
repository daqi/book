import Router from 'koa-router';
import searchService from '../services/search';

const search: Router.IMiddleware = async (ctx, next) => {
    const { q = '', page = 1 } = ctx.query;
    const res = await searchService({ name: q, page });
    ctx.body = { code: 0, data: res };
};

export default search;
