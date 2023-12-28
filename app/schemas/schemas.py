from pydantic import BaseModel
from pydantic.types import constr

class CreateTodoRequest(BaseModel):
    title : constr(min_length=1,max_length=50)
    detail : str

class TaskListResponse(BaseModel):
    id : int
    title : str
    detail : str
    complete : bool