import React from "react";

const Blog = ({ posts }) => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">
                    Blog Saya
                </h1>
                <div className="space-y-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                        >
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
                                {post.title}
                            </h2>
                            <p className="text-gray-800 text-justify leading-relaxed">
                                {post.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();

    return {
        props: {
            posts: posts.slice(0, 10),
        },
    };
}

export default Blog;
