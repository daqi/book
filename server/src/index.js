const Koa = require("koa");
const querystring = require("querystring");
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const url = require("url");

const { JSDOM } = jsdom;

const app = new Koa();

app.use(async (ctx) => {
  const { name, page } = ctx.query;
  const pageSize = 20;
  const params = {
    cat: 1001,
    q: name,
    start: pageSize * (page - 1),
  };
  const res = await fetch(
    `https://www.douban.com/j/search?${querystring.stringify(params)}`
  ).then((res) => res.json());
  const { total, limit, more, items } = res;
  const data = items.map((el) => {
    // console.log(el)
    const frag = JSDOM.fragment(el);
    const imgUrl = frag.querySelector(".pic img")
      ? frag.querySelector(".pic img").src
      : "";
    const href = frag.querySelector(".title a")
      ? frag.querySelector(".title a").href
      : "";
    const title = frag.querySelector(".title a")
      ? frag.querySelector(".title a").textContent
      : "";
    const ratingNumber = frag.querySelector(".rating_nums")
      ? frag.querySelector(".rating_nums").textContent
      : "";
    const commentsNumber = frag.querySelector(".rating_nums + span")
      ? frag.querySelector(".rating_nums + span").textContent
      : "";
    const subjectCast = frag.querySelector(".subject-cast")
      ? frag.querySelector(".subject-cast").textContent
      : "";
    const description = frag.querySelector("p")
      ? frag.querySelector("p").textContent
      : "";
    const theUrl = url.parse(href);
    const theUrlParams = querystring.parse(theUrl.query);
    // console.log(theUrlParams);
    return {
      imgUrl,
      url: theUrlParams.url,
      title,
      rating: Number(ratingNumber),
      comments: commentsNumber ? Number(commentsNumber.match(/\d+/)[0]) : 0,
      subjectCast,
      description,
    };
  });
  ctx.body = { total, limit, more, data };
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
