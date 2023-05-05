import React, {useEffect, useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Content = () => {
    //1. useEffect(callback)
    // - Goi callback moi khi component re-render
    // - Goi callback sau khi component them element vao DOM
    // - Callback luon duoc goi sau khi component mounted
    // - Su dung cach 1 de call API thi no se gui rat nhieu request vi moi lan setPosts la component se re-render 
    // --- ma callback no se duoc goi moi khi component re-render
   //2. useEffect(callback, [])
   // - Chi goi callback sau khi component mounted
   //3. useEffect(callback, [deps]
    // - callback se duoc goi lai moi khi dependency thay doi

   // ------------- Ca 3 thang -------------
   //1. Callback luon duoc goi sau khi component mounted
   //2. Cleanup function luon duoc goi truoc khi component unmounted
   //3. Cleanup function luon duoc goi truoc khi callback duoc goi (tru lan mounted)
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);

    const tabs = ['posts', 'comments', 'albums']
    const [type, setType] = useState('posts');
    const [showGoToTop, setShowGoToTop] = useState(false);

    const [loading, setLoading] = useState(false);

    console.log(type);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => setPosts(posts));

        setLoading(true);
    }, [type])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= 200)
                setShowGoToTop(true)
            else
                setShowGoToTop(false)
        }
        window.addEventListener('scroll', handleScroll);

        //cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });
    
    return (
        <div >
            {tabs.map(tab => (
                <button key={tab}
                    style={type === tab ? {color: '#fff', backgroundColor: 'black'} : {}}
                    onClick={() => setType(tab)}>
                    {tab}
                </button>
            ))}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}>
            </input>
                {loading ? 
                    <ClipLoader
                    color="blue"
                    loading={loading}
                    size={150}></ClipLoader>
                : <ul>
                    {posts.map((post, index) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>}
            {showGoToTop &&  (
                <button
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20
                    }}>
                    go to top
                </button>
            )}
        </div>
    )
}

export default Content;