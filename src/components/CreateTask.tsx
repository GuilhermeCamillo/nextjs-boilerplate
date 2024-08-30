"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createTask } from "@/store/actions/task.actions";

const CreateTask = () => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      await createTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="flex w-full mt-4">
      <Input
        type="text"
        placeholder="Adicionar nova tarefa"
        className="flex-1 w-full border border-gray-300 rounded-r-none ring-0 focus:ring-0 rounded-l-md px-4 py-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
      />
      <Button
        onClick={handleAddTask}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-l-none rounded-r-md px-4 py-2"
      >
        Adicionar
      </Button>
    </div>
  );
};

export default CreateTask;
