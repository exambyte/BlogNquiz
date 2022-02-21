const blog_section = document.getElementById('blogs-section');
const particular_blog_section = document.getElementById('particular-blog-section');
const tag_and_Categories = document.getElementById('tags-categories');
const displayfullBlog = (blogData) => {
    blog_section.style.display = "none";
    tag_and_Categories.style.display="none";
    particular_blog_section.style.display = "flex";
    console.log(blogData.description);
    particular_blog_section.innerHTML = `
        <div class="particular-blog-info">
            <div class="particular-blog-title">
                <h1>${blogData.title}</h1>
                <hr>
            </div>
            <div class="particular-blog-author-time-info">
                <p>-${blogData.createdById.name}</p>
                <p>Created at : ${blogData.createdAt.substring(0, 10)}</p> 
            </div>
        </div>
        <div class="particular-blog-category">
            <div class="particular-blog-c">
                <p>${blogData.category}</p>
            </div>
            <div class="particular-blog-markdown">
                <p>${blogData.markdown}</p>
            </div>
        </div>
        <div class="particular-blog-description">
            <hr>
            <pre>${blogData.blogContent}</pre>
        </div>
    
    `
}


const dsplayBlogs = async () => {
    console.log('hello world');
    try {
        const res = await fetch('/getAllBlogs', {
            method: 'GET',
            headers: {
                contentType: 'application/json'
            }
        });
        const blog = await res.json();
        if (blog) {
            console.log(blog);
            for (let i = 0; i < blog.length; i++) {
                blog_section.innerHTML += `
                <div class="site-content">
                <div class="posts">
                    <div class="post-content" >
                        <div class="blog-small-info">
                            <p>-${blog[i].createdById.name}</p>
                            <p>${blog[i].markdown}</p>
                        </div>
                        <div class="post-title">
                            <a href="#">${blog[i].title}</a>
                            <p>${blog[i].description.substring(0,100)}.....</p>
                            <button class="bttn post-bttn"  onclick="displayfullBlog(${JSON.stringify(blog[i]).split('"').join("&quot;")})">Read More &nbsp;<i class="fas fa-arrow-right"></i></button>
                        </div>

                    </div>
                    <hr>
                    </div>
                </div>
                   
                `
                tag_and_Categories.innerHTML=`
                    <div class="tag-area">
                        <h2>Tags</h2>
                    </div>
                    <div class="category-area">
                        <h2>Categories</h2>
                        <div class="category-btns">
                            <button>Mathematics</button>
                            <button>Computer Science</button>
                            <button>Physics</button>
                            <button>Chemistry</button>
                        </div>
                    </div>
                `
            }
            
        }
    } catch (err) {
        console.log(err);
    }
}
dsplayBlogs();



