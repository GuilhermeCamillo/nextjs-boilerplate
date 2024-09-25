"use client";

import { Task } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { deleteTask, updateTask } from "@/store/actions/task.actions";
import { Button } from "./ui/button";

const TaskItem = ({ item }: { item: Task }) => {
  return (
    <div
      className={cn(
        "flex flex-row w-full justify-between border shadow-sm rounded-sm p-2 items-center",
        item.completed
          ? "line-through text-gray-500"
          : "bg-white hover:bg-gray-100"
      )}
    >
      <div className="flex flex-row gap-2 items-center text-wrap">
        <Checkbox
          checked={item.completed}
          onCheckedChange={(e) => updateTask(item.id, Boolean(e))}
        />
        <p className="break-all">{item.title}</p>
      </div>
      <Button
        variant="ghost"
        onClick={() => deleteTask(item.id)}
        className="text-red-500 hover:text-red-600 focus:outline-none py-1 px-2"
      >
        <TrashIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TaskItem;
