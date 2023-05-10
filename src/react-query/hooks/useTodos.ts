import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }

const useTodos= () => {
    const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

    return useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime:10*1000
      });
}

export default useTodos

// {
//     defaultOptions:{
//       queries:{
//         retry:3,
//         cacheTime:300_000, // 5 mins after that garbage collection
//         staleTime:10*1000, // 10secs
//         refetchOnReconnect:false,
//         refetchOnWindowFocus:false,
//         refetchOnMount:false
//       }
//     }
//   }