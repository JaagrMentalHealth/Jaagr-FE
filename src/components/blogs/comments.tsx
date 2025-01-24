import React,{ useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
interface Comment {
    id: number;
    author: string;
    text: string;
    timestamp: Date;
  }




function Comments() {
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
    <div>
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
  )
}

export default Comments;
