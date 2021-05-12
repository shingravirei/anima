import ky from 'ky';

export const anilistLogin = async (code: string | undefined) => {
    const res = await ky
        .post('http://localhost:3001/oauth', {
            json: {
                code,
            },
        })
        .json();

    return res;
};
