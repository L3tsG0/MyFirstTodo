from pydantic import BaseModel


class CreateTodoRequest(BaseModel):
    title : str
    detail : str

class TaskListResponse(BaseModel):
    id : int
    title : str
    detail : str
    complete : bool