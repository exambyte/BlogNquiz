const blog_section = document.getElementById('blogs-section');
const particular_blog_section = document.getElementById('particular-blog-section');
const displayfullBlog = (blogData) => {
    blog_section.style.display = "none";
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
                <div class="blog-card">
                <div class="blog-title">
                    <h2>${blog[i].title}</h2>
                    <hr>
                </div>
                <div class="author-details">
                    <p>Author: ${blog[i].createdById.name}</p>
                    <p>Category: ${blog[i].category}</p>
                </div>
                <div class="blog-details">
                     <hr>
                    ${blog[i].description.substring(0,100)}.....
                </div>
                <div class="read-more-btn">
                    <button onclick="displayfullBlog(${JSON.stringify(blog[i]).split('"').join("&quot;")})">Read More</button>
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



