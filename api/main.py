from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json, os

app = FastAPI()


if "PYTEST_CURRENT_TEST" in os.environ:
    DATA_FILE = "test_ideas.json"
else:
    DATA_FILE = "ideas.json"


class Idea(BaseModel):
    id: int
    title: str
    impact: str
    effort: str
    status: str
    votes: int = 0


def load_ideas():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        try:
            return [Idea(**i) for i in json.load(f)]
        except:
            return []

def save_ideas(ideas):
    with open(DATA_FILE, "w") as f:
        json.dump([i.model_dump() for i in ideas], f, indent=2)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# all routes for the API



@app.get("/ideas")
def get_ideas():
    return load_ideas()



@app.post("/ideas")
def create_idea(idea: Idea):
    ideas = load_ideas()
    if any(i.title.lower() == idea.title.lower() for i in ideas):
        raise HTTPException(status_code=400, detail="Duplicate idea")
    ideas.append(idea)
    save_ideas(ideas)
    return idea



@app.post("/ideas/{idea_id}/vote")
def vote_idea(idea_id: int):
    ideas = load_ideas()
    for i in ideas:
        if i.id == idea_id:
            i.votes += 1
            save_ideas(ideas)
            return i
    raise HTTPException(status_code=404, detail="Idea not found")



@app.delete("/ideas/{idea_id}")
def delete_idea(idea_id: int):
    ideas = load_ideas()
    new_ideas = [i for i in ideas if i.id != idea_id]
    if len(new_ideas) == len(ideas):
        raise HTTPException(status_code=404, detail="Idea not found")
    save_ideas(new_ideas)
    return {"message": "Idea deleted"}
