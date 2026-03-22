// ============================================
// BLOG COMMENTS - WITH FALLBACK
// ============================================

const BLOG_COMMENTS_API_URL = 'https://script.google.com/macros/s/AKfycbznsFnGt4GU2ia-Fx9h7R9PvXGNBM-QWpvt9Hzp11r0OfHRv3zVWEk4HDFu7-8_np7E/exec';

let blogComments = [];

async function loadBlogComments(postId) {
    const commentsList = document.getElementById('blogCommentsList');
    if (!commentsList) return;
    
    commentsList.innerHTML = `
        <div class="text-center text-gray-500 dark:text-gray-400 py-4">
            <i class="fas fa-spinner fa-spin"></i>
            <p class="text-sm mt-2">Loading comments...</p>
        </div>
    `;
    
    try {
        const response = await fetch(`${BLOG_COMMENTS_API_URL}?postId=${postId}`);
        const data = await response.json();
        blogComments = Array.isArray(data) ? data.filter(c => c.postId == postId) : [];
        displayBlogComments();
    } catch (error) {
        console.warn('Google Sheets unavailable, using demo mode');
        commentsList.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                <i class="fas fa-comment fa-2x mb-2 opacity-50"></i>
                <p class="text-sm">Comments are stored locally. Your feedback will appear after refresh.</p>
            </div>
        `;
    }
}

function displayBlogComments() {
    const commentsList = document.getElementById('blogCommentsList');
    if (!commentsList) return;
    
    if (!blogComments || blogComments.length === 0) {
        commentsList.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                <i class="fas fa-comment fa-2x mb-2 opacity-50"></i>
                <p class="text-sm">No comments yet. Be the first to share your thoughts!</p>
            </div>
        `;
        return;
    }
    
    commentsList.innerHTML = blogComments.map(comment => `
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2 mb-2">
                <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-xs text-blue-600"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-sm text-gray-900 dark:text-white">${escapeHtml(comment.name)}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${comment.date || 'Just now'}</p>
                </div>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300 mt-2">${escapeHtml(comment.message)}</p>
        </div>
    `).join('');
}

async function submitBlogComment(postId, name, email, message) {
    try {
        const response = await fetch(BLOG_COMMENTS_API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postId: postId,
                name: name,
                email: email || '',
                message: message,
                type: 'Blog Comment',
                date: new Date().toLocaleDateString()
            })
        });
        return true;
    } catch (error) {
        console.warn('Using local storage fallback');
        return saveCommentLocal(postId, name, email, message);
    }
}

function saveCommentLocal(postId, name, email, message) {
    try {
        const localComments = JSON.parse(localStorage.getItem(`blog_comments_${postId}`) || '[]');
        localComments.push({
            name, email, message,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem(`blog_comments_${postId}`, JSON.stringify(localComments));
        return true;
    } catch (e) {
        return false;
    }
}

function loadLocalComments(postId) {
    try {
        const localComments = JSON.parse(localStorage.getItem(`blog_comments_${postId}`) || '[]');
        blogComments = localComments;
        displayBlogComments();
    } catch (e) {
        console.warn('No local comments found');
    }
}

function initBlogCommentForm() {
    const form = document.getElementById('blogCommentForm');
    if (!form) return;
    
    const postIdInput = document.getElementById('blogPostId');
    const postId = postIdInput ? postIdInput.value : '';
    
    if (postId) {
        loadBlogComments(postId).catch(() => loadLocalComments(postId));
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('blogCommentName')?.value.trim();
        const email = document.getElementById('blogCommentEmail')?.value.trim();
        const message = document.getElementById('blogCommentMessage')?.value.trim();
        const postId = document.getElementById('blogPostId')?.value;
        
        if (!name || !message) {
            alert('Please enter your name and message');
            return;
        }
        
        const submitBtn = document.getElementById('submitBlogCommentBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
        submitBtn.disabled = true;
        
        const success = await submitBlogComment(postId, name, email, message);
        
        if (success) {
            alert('✅ Comment posted successfully!');
            form.reset();
            await loadBlogComments(postId).catch(() => loadLocalComments(postId));
        } else {
            alert('❌ Failed to post comment. Please try again.');
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blogCommentForm')) {
        initBlogCommentForm();
    }
});