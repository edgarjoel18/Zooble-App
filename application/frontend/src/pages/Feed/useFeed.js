import {useState,useEffect} from 'react'
import axios from 'axios';

function useFeed(offset) {

    const [feedPosts, setFeedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [hasMore,setHasMore] = useState(false)


    useEffect(() =>{
        setLoading(true)
        setError(false)
        let cancel
        axios.get('/api/posts',{params:{offset}})
        .then(res =>{
            setFeedPosts(prevPosts =>{
                return [...new Set([...prevPosts,...res.data])]
            })
            setHasMore(res.data.length > 0);
            setLoading(false)
            console.log(res.data)
        })
        .catch(res =>{
            setError(true)
        })
    },[offset,hasMore])

    return {loading,error,hasMore,feedPosts}
}

export default useFeed
