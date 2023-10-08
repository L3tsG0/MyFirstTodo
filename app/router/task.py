from fastapi import APIRouter, HTTPException, Query,Path

from sqlalchemy import ScalarResult, create_engine,select

from ..schemas.schemas import TaskListResponse

from ..database.database import todo_items,AsyncSession

from typing import List


router = APIRouter()
@router.get("/tasks",response_model=List[TaskListResponse])
async def task_list() -> list[todo_items]:
    stmt = select(todo_items)
    async with AsyncSession() as session:
        
        result: ScalarResult[todo_items] = await session.scalars(stmt)
        

        # print(result)
        return [x for x in result]

        


@router.post("/tasks")
async def create_task(complete:bool = Query(False),title : str = Query(...),detail : str = Query("")):

    async with AsyncSession() as session:
        new_task = todo_items(title = title,detail = detail,complete = complete)
        session.add(new_task)
        await session.commit()
    

@router.put("/tasks/{task_id}")
async def update_task(task_id : int = Path(...,ge=1)):
    stmt = select(todo_items).where(todo_items.id == task_id)
    async with AsyncSession() as session:
        task = await session.scalar(stmt)
        if isinstance(task,todo_items):
            if task.complete == True:
                task.complete = False
            else:
                task.complete = True
        
            await session.commit()

            
            refreshed_task = await session.scalar(stmt)
            
            return refreshed_task
        
            
        else:
            raise ValueError("The result was None!")

@router.delete("/tasks/{task_id}")
async def delete_task(task_id : int= Path(...,ge=1)):
    stmt = select(todo_items).where(todo_items.id == task_id)
    async with AsyncSession() as session:
        result = session.scalar(stmt)
        if result:
            try:
                _ = session.delete(result)
                await session.commit()
            except Exception as e:
                await session.rollback()  # エラーが発生した場合、変更をロールバック
                raise HTTPException(status_code=400, detail="Failed to delete the entry.") from e
        else:
            raise HTTPException(status_code=404, detail="Entry not found.")
        

