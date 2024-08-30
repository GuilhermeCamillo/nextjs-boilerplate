import CreateTask from "@/components/CreateTask";
import TaskItem from "@/components/TaskItem";
import { getTasks } from "@/store/actions/task.actions";
import { Task } from "@prisma/client";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main className="container mx-auto flex min-h-screen flex-col sm:p-24 p-6">
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="font-bold text-lg">Tarefas</h1>
        {/* <Link
          href="logout"
          className="flex flex-row gap-2 border rounded-sm py-1 px-3 text-sm items-center font-medium hover:bg-slate-200"
        >
          SAIR <LogOut className="w-3 h-3" />
        </Link> */}
      </div>
      <CreateTask />
      <div className="flex flex-col gap-2 w-full mt-5">
        {tasks?.map((item: Task) => (
          <TaskItem item={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}
