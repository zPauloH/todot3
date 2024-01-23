import React, { useState } from "react";
import { api } from "src/utils/api";
import { useQueryClient } from "@tanstack/react-query";

export function TodoList () {
    
    const [task, setTask] = useState<{
        id: number | undefined
        name: string 
    }>({id: 0,
        name: ""});

    const itemList = api.todoItem.listAll.useQuery(); 
    const queryClient = useQueryClient();
    const deleteData = api.todoItem.delete.useMutation(
        {
        onSuccess() {
            window.location.reload();
                void queryClient.invalidateQueries(
                    api.todoItem.listAll.useQuery()
                ); 
            }
        
        }
    );

    const addData = api.todoItem.create.useMutation({
        onSuccess() {
            setTask({
                id: undefined,
                name: "",
              });
        }
    });
    const updateData = api.todoItem.update.useMutation();



    const deleteTask = async (id: number) => {
        await deleteData.mutate({
            id: id,
        })
    }

    const updateTask = async (id: number, name: string) => {
        let newTask = { id, name };
        setTask(newTask);
    }

    const getValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target;
        setTask(
            {id: task?.id,
            name: value});
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        if (task.name) {
          if (task.id) {
            updateData.mutate({
              id: task.id,
              name: task.name,
            });
          } else {
            addData.mutate(task);
          }
        }
      };

    return (
        <>
            <div className="container flex items-center justify-center gap-12 px-4 py-16">
                <form onSubmit={handleSubmit}>
                    <input type="text" id="name" value={task?.name} placeholder="Add a new task" 
                    className="rounded-sm text-2xl py-2.5 px-2.5 mx-4" onChange={getValue}/>
                    <button type="submit" className="text-2xl text-[hsl(280,100%,70%)] bg-white py-2.5 px-2.5 rounded-md" >
                    <span className="text-2xl text-[hsl(280,100%,70%)] font-extrabold">
                            Send
                        </span> 
                    </button>
                </form>
            </div>

            <div>
                <ul>
                    
                    {itemList.data?.items.map((item) =>
                    (
                        <li key={item.id}>
                            <div className="flex">
                                <p className="text-5xl text-white tracking-tight">
                                    {item.name}
                                </p>
                                <button className="p-2.5 bg-white rounded-xl hover:rounded-3xl transition-all duration-300 text-[hsl(280,100%,70%)] mx-4" onClick={() => updateTask(item.id, item.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>

                                <button className="inline-flex items-center hover:rounded-3xl transition-all duration-300 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md" onClick={() => deleteTask(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    
                                </button>
                            </div>
                        </li>
        
                    )
                    )}
                </ul>

            </div>
        </>
    )
}
