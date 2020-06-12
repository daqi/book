import Koa from 'koa';

import router from './router';
import corsDomain from './middleware/corsDomain';

const app = new Koa();

app.use(corsDomain);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
