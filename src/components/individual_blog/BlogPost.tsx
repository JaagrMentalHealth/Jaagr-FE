'use client';

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';

// Define types for Comment
interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: Date;
}

const BlogPost: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Michael Chen',
      text: 'Great article!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
  ]);

  const [newComment, setNewComment] = useState<string>('');

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: 'Guest User',
      text: newComment,
      timestamp: new Date(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">Jaagr</span>
            <div className="ml-10 space-x-4">
              <a href="#" className="text-gray-700">
                Home
              </a>
              <a href="#" className="text-gray-700">
                About Us
              </a>
              <a href="#" className="text-gray-700">
                Blogs
              </a>
            </div>
          </div>
          <div className="space-x-4">
            <button className="text-gray-700">Login</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Blog Content */}
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Understanding Mental Health: A Guide to Wellness and Resilience
            </h1>

            {/* Author and Icons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="ml-3">
                  <p className="text-gray-900">John Doe</p>
                  <p className="text-gray-500 text-sm">Published on March 15, 2023</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-red-500 hover:text-red-600">
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </button>
                <button className="text-gray-500 hover:text-gray-600">
                  <FontAwesomeIcon icon={faBookmark} size="lg" />
                </button>
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-gray-200 h-64 mb-8 rounded border border-gray-300">
              <img
                className="w-full h-full rounded object-cover"
                src="https://plus.unsplash.com/premium_photo-1734545294056-9dbee090d3ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>

            <p className="text-gray-700 mb-8">
              Mental health is an essential part of overall well-being, yet it often takes a backseat in conversations about
              health. Just as physical health is crucial for a thriving body, mental health is the cornerstone of a fulfilled and
              balanced life. In this blog, we'll explore what mental health is, why it matters, and practical steps to maintain it.
            </p>

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-2 bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Post Comment
                </button>
              </form>

              {/* Display Comments */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-gray-500 text-sm">
                        {formatDistanceToNow(comment.timestamp)} ago
                      </p>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {/* <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="space-y-4">
              <div className="bg-gray-200 h-32 rounded"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
