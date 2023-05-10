import { useQuery } from '@tanstack/react-query';
import axios from "axios"

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

const usePosts = (userId : number | undefined) => {

    const fetchPosts = () => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts',{params:{userId}})
    .then((res) => (res.data))

     const posts = useQuery<Post[],Error>({
        queryKey: userId ?  ["users",userId,"posts"] : ["posts"],
        queryFn:fetchPosts,
        staleTime:1*60*1000 // 1 min
     })

     return posts
}
export default usePosts