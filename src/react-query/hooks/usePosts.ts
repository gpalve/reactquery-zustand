import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from "axios"

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
interface PostQuery {
    pageSize: number;
}
const usePosts = (query:PostQuery) => {

    const fetchPosts = ({pageParam=1}) => axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts',{params:{
        _start : (pageParam-1)*query.pageSize,
        _limit : query.pageSize
    }})
    .then((res) => (res.data))

     const posts = useInfiniteQuery<Post[],Error>({
        queryKey: ["posts",query],
        queryFn:({pageParam}) => fetchPosts({pageParam}),
        staleTime:1*60*1000, // 1 min
        keepPreviousData:true,
        getNextPageParam:(lastPage,allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined
        }
     })

     return posts
}
export default usePosts