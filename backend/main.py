from fastapi import FastAPI,HTTPException
import httpx
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
url =  "https://jsonplaceholder.typicode.com/posts"
# url = "https://jsonplaceholder.typicode.com/invalid-users"

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get('/api/posts')
async def get_posts(page:int=1,limit:int=10,search:str=''):
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code >= 400:
            raise HTTPException(
                            status_code=response.status_code,
                            detail='Failed to load data...'
                        )

        posts = response.json()

        #search logic
        if search:
            posts = [
                post for post in posts
                if search.lower() in post['title'].lower()
                or search.lower() in post['body'].lower()
            ]


        total = len(posts)
        start = (page-1) * limit
        end = start + limit

        paginated_posts = posts[start:end]

        return {"data": paginated_posts,"total": total}