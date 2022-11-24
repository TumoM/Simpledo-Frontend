import useSWR from 'swr';

import { IError } from '../interfaces/index';

export function useSWRGet(url: string, id = '', options = {}) {
    let sendingUrl = url == undefined || id == undefined ? undefined : url + id;
    /*console.log('got this:', {url, id});
    console.log('sendingUrl:', sendingUrl);*/
    const { data, error } = useSWR(() => sendingUrl, fetcher, options);

    return {
        data: data,
        isLoading: !error && !data,
        isError: undefined,
    };
}

export const fetcher = async (url: string) => {
    // console.log('Final sendingUrl:', process.env.NEXT_PUBLIC_API_URL + url);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url);
    if (!res.ok) {
        const error: IError = new Error('An error occurred while fetching the data. ');
        console.log({
            status: res.status,
            statusText: res.statusText || 'Unknown error',
        });
        const data = await res.json();
        error.message = 'An error occurred while fetching the data. ' + (res.statusText || 'Unknown error');
        error.code = res.status;
        throw error;
    }
    return res.json();
};
