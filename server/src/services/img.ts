import fetch, { Headers } from 'node-fetch';

type Params = {
    url: string;
};

type ImgService = (
    params: Params
) => Promise<{ body: NodeJS.ReadableStream; type: string | null }>;

const imgService: ImgService = async ({ url }) => {
    const res = await fetch(url);
    const { body, headers } = res;
    return { body, type: headers.get('content-type') };
};

export default imgService;
