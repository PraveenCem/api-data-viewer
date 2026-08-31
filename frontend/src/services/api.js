async function getPosts(page=1, search = ''){
    const api_url = "http://127.0.0.1:8000/api/posts";
    const params = new URLSearchParams({
        page:page,
        limit: 10,
        search:search
    })
    const response = await fetch(`${api_url}?${params}`);
    if(!response.ok){
        throw new Error('failed to load data..');
    }
    return response.json();
}

export default getPosts;