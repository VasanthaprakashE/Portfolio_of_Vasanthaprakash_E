// ============================================
// BLOG POSTS DATA - OPTIMIZED
// ============================================

const blogPosts = [
    {
        id: 1,
        title: "Building Efficient ETL Pipelines with Python and SQL",
        excerpt: "Learn how to design scalable ETL pipelines for IoT and operational data using Python, Pandas, and SQL. Includes real-world examples from urban waste management.",
        content: `
            <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    In the world of data analytics, ETL (Extract, Transform, Load) pipelines are the backbone of any data-driven organization. 
                    Whether you're dealing with IoT sensor data, operational logs, or business metrics, having a robust ETL process ensures 
                    that your data is clean, reliable, and ready for analysis.
                </p>
                
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Why ETL Matters</h2>
                <p class="text-gray-700 dark:text-gray-300 mb-6">
                    In my experience at Urbaser Sumeet, we handle massive amounts of IoT data from GPS fleet trackers and RFID bin sensors. 
                    Without a proper ETL pipeline, this data would be unusable. Here's why ETL is crucial:
                </p>
                <ul class="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>Data Quality:</strong> Remove duplicates, handle missing values, and standardize formats</li>
                    <li><strong>Performance:</strong> Optimize data for querying and analysis</li>
                    <li><strong>Automation:</strong> Reduce manual data processing time</li>
                    <li><strong>Scalability:</strong> Handle increasing data volumes efficiently</li>
                </ul>
                
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Python + SQL: The Perfect Combination</h2>
                <p class="text-gray-700 dark:text-gray-300 mb-6">
                    Python excels at data transformation and scripting, while SQL is unbeatable for querying and database operations. 
                    Here's a practical example:
                </p>
                
                <pre><code class="language-python">
import pandas as pd
import pymysql
from sqlalchemy import create_engine

# Extract: Read Excel files
df = pd.read_excel('inventory_data.xlsx')

# Transform: Clean and validate
df['date'] = pd.to_datetime(df['date'])
df = df.drop_duplicates(subset=['item_id', 'date'])
df = df.fillna({'quantity': 0, 'price': df['price'].median()})

# Load: Insert into MySQL
engine = create_engine('mysql+pymysql://user:pass@localhost/db')
df.to_sql('inventory', engine, if_exists='append', index=False)

print(f"Loaded {len(df)} records successfully!")
                </code></pre>
                
                <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-lg my-8">
                    <p class="text-gray-700 dark:text-gray-300 italic">
                        💡 <strong>Pro Tip:</strong> Use AI tools like ChatGPT and DeepSeek to prototype ETL scripts faster. 
                        This "vibe coding" approach has helped me reduce development time by 40%.
                    </p>
                </div>
            </div>
        `,
        date: "March 15, 2024",
        readTime: "6 min read",
        category: "ETL",
        tags: ["ETL", "Python", "SQL"],
        image: "https://via.placeholder.com/800x400/3b82f6/ffffff?text=ETL+Pipeline",
        author: "Vasanthaprakash E"
    },
    {
        id: 2,
        title: "Power BI Best Practices for Real-Time Dashboarding",
        excerpt: "Discover how to create responsive, interactive dashboards with Power BI that provide real-time insights for operational monitoring.",
        content: `
            <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    Power BI has become the go-to tool for business intelligence and data visualization. Here are best practices for creating real-time dashboards.
                </p>
                
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Optimize Data Models</h2>
                <ul class="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li>Use star schema design</li>
                    <li>Remove unnecessary columns</li>
                    <li>Create calculated columns in Power Query, not DAX</li>
                </ul>
                
                <pre><code class="language-dax">
// Example DAX measure for real-time KPIs
Total Collections = 
CALCULATE(
    SUM(Collections[Amount]),
    Collections[Date] = TODAY()
)
                </code></pre>
                
                <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-lg my-8">
                    <p class="text-gray-700 dark:text-gray-300">
                        ✅ <strong>Pro Tip:</strong> Use incremental refresh for large datasets to balance performance and freshness.
                    </p>
                </div>
            </div>
        `,
        date: "March 5, 2024",
        readTime: "5 min read",
        category: "Power BI",
        tags: ["Power BI", "DAX", "Visualization"],
        image: "https://via.placeholder.com/800x400/10b981/ffffff?text=Power+BI",
        author: "Vasanthaprakash E"
    },
    {
        id: 3,
        title: "Vibe Coding: Accelerating Development with AI Tools",
        excerpt: "Explore how AI-powered tools like ChatGPT and DeepSeek can supercharge your development workflow and boost productivity.",
        content: `
            <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    "Vibe coding" is the new paradigm where developers leverage AI tools to accelerate development, prototype faster, and automate repetitive tasks.
                </p>
                
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">My AI Tool Stack</h2>
                <ul class="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    <li><strong>ChatGPT/DeepSeek:</strong> Prototyping and code generation</li>
                    <li><strong>GitHub Copilot:</strong> Real-time code suggestions</li>
                    <li><strong>Julius AI:</strong> Data analysis and insights</li>
                </ul>
                
                <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600 p-6 rounded-lg my-8">
                    <p class="text-gray-700 dark:text-gray-300">
                        🚀 <strong>Real Impact:</strong> Using vibe coding, I reduced MIS report generation time from 4 hours to 30 minutes!
                    </p>
                </div>
            </div>
        `,
        date: "February 20, 2024",
        readTime: "4 min read",
        category: "AI",
        tags: ["AI", "Automation", "Vibe Coding"],
        image: "https://via.placeholder.com/800x400/8b5cf6/ffffff?text=AI+Tools",
        author: "Vasanthaprakash E"
    }
];

// Load blog posts on blog.html
function loadBlogPosts() {
    const grid = document.getElementById('blogPostsGrid');
    if (!grid) return;
    
    if (!blogPosts.length) {
        grid.innerHTML = '<div class="text-center py-8">No blog posts found.</div>';
        return;
    }
    
    grid.innerHTML = blogPosts.map(post => `
        <div data-aos="fade-up" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
            <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover group-hover:scale-105 transition duration-300">
            <div class="p-6">
                <div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span><i class="far fa-calendar-alt mr-1"></i> ${post.date}</span>
                    <span><i class="far fa-clock mr-1"></i> ${post.readTime}</span>
                </div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 transition">
                    <a href="blog-post.html?id=${post.id}">${escapeHtml(post.title)}</a>
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-4">${escapeHtml(post.excerpt)}</p>
                <div class="flex justify-between items-center">
                    <a href="blog-post.html?id=${post.id}" class="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1">
                        Read More <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                    <div class="flex gap-2">
                        ${post.tags.map(tag => `<span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load single blog post
function loadBlogPost() {
    const container = document.getElementById('blogPostContent');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) {
        container.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-8">
                <i class="fas fa-exclamation-circle fa-3x mb-3 text-red-500"></i>
                <h2 class="text-2xl font-bold mb-2">Post Not Found</h2>
                <p>The blog post you're looking for doesn't exist.</p>
                <a href="blog.html" class="inline-block mt-4 text-blue-600 hover:underline">← Back to Blog</a>
            </div>
        `;
        return;
    }
    
    const postIdInput = document.getElementById('blogPostId');
    if (postIdInput) postIdInput.value = postId;
    
    container.innerHTML = `
        <div data-aos="fade-up">
            <div class="mb-8">
                <div class="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
                    <span><i class="far fa-calendar-alt mr-2"></i>${post.date}</span>
                    <span><i class="far fa-clock mr-2"></i>${post.readTime}</span>
                    <span><i class="fas fa-tag mr-2"></i>${post.category}</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">${escapeHtml(post.title)}</h1>
                <div class="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                    <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-blue-600 text-xl"></i>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-900 dark:text-white">${escapeHtml(post.author)}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Data Analyst & MIS Executive</p>
                    </div>
                </div>
                <img src="${post.image}" alt="${post.title}" class="w-full rounded-2xl shadow-lg mb-8">
            </div>
            ${post.content}
        </div>
    `;
    
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('blogPostsGrid')) loadBlogPosts();
    if (document.getElementById('blogPostContent')) loadBlogPost();
});