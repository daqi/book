import qs from 'querystring';
import url from 'url';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

type GetRealUrl = (href: string) => string;
type GetSubjectId = (realUrl: string) => string;
type BookInfo = {
    id: string;
    pic: string;
    url: string;
    title: string;
    rating?: string;
    comments?: string;
    subjectCast?: string;
    description?: string;
};
type Params = {
    name: string;
    page: number;
};
type SearchService = (
    params: Params
) => Promise<{ total: number; limit: number; more: boolean; data: BookInfo[] }>;

const getRealUrl: GetRealUrl = (href) => {
    const query = url.parse(href).query;
    if (!query) return '';
    const hrefParams = qs.parse(query);
    return Array.isArray(hrefParams.url) ? hrefParams.url[0] : hrefParams.url;
};

const getSubjectId: GetSubjectId = (realUrl) => {
    const pathname = url.parse(realUrl).pathname;
    if (!pathname) return '';
    const matched = pathname.match(/\/subject\/(\d+)\//);
    const id = matched ? matched[1] : '';
    return id;
};

const pageSize = 20;

const searchService: SearchService = async ({ name, page }) => {
    const params = {
        cat: 1001,
        q: name,
        start: pageSize * (page - 1),
    };

    const res = await fetch(
        `https://www.douban.com/j/search?${qs.stringify(params)}`
    ).then((r) => r.json());

    const { total, limit, more, items } = res;

    const data = items
        .map((html: string) => {
            // console.log(el)
            const $ = cheerio.load(html);
            const pic = $('.pic img').attr('src');
            const href = $('.title a').attr('href');
            const title = $('.title a').text();
            const rating = $('.rating_nums').text();
            const comments = $('.rating_nums + span').text();
            const subjectCast = $('.subject-cast').text();
            const description = $('p').text();

            if (!href || !title || !pic) return null;

            const realUrl = href ? getRealUrl(href) : '';
            const id = realUrl ? getSubjectId(realUrl) : '';

            if (!realUrl || !id) return null;

            return {
                id,
                pic,
                title,
                rating,
                comments,
                subjectCast,
                description,
                url: realUrl,
            };
        })
        .filter(Boolean);

    return { total, limit, more, data };
};

export default searchService;
