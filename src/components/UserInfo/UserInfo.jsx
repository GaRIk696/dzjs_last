import { useState, useEffect } from "react";
import './UserInfoStyle.css';

export const UserInfo = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [activeUserId, setActiveUserId] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setUsers(json));
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setPosts(json));
    }, []);

    const handleUserClick = (userId) => {
        setActiveUserId(activeUserId === userId ? null : userId);
    };

    const getUserPosts = (userId) => {
        return posts.filter(post => post.userId === userId);
    };

    return (
        <div className="container">
            <div className="user-list">
                {users.map(user => (
                    <div
                        key={user.id}
                        className={`user-button ${activeUserId === user.id ? 'active' : ''}`}
                        onClick={() => handleUserClick(user.id)}
                    >
                        {user.name}
                    </div>
                ))}
            </div>
            <div className="post-list">
                {activeUserId && (
                    <>
                        <h2>Посты пользователя {users.find(user => user.id === activeUserId)?.name}</h2>
                        {getUserPosts(activeUserId).map(post => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <strong>Title:</strong> {post.title}
                                </div>
                                <div className="post-body">
                                    <strong>Body:</strong> {post.body}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};