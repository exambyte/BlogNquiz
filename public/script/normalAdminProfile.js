const displayAdminAllBlogsSection = document.getElementById('show-admin-all-blogs');
const editBlogSection = document.getElementById('edit-blog-section');
const formFields = document.querySelector('form');


//Function to redirect admin to add blog Section

/**
 * 
 * @param {String} id 
 */
const displayCreateBlogSection = (id) => {
    location.assign(`/addBlog/${id}`);
}

//Function to Display all the Blogs creted by user
/**
 * 
 * @param {String} id
 * @async 
 */
const displayShowBlogSection = async(id) => {

    try {
        /**
         * @method GET
         * @headers {Object}
         */
        const res = await fetch(`/showAdminAllBlogs/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        if (data) {
            editBlogSection.style.display = 'none';
            displayAdminAllBlogsSection.style.display = 'flex';
            //Displaying data dynamically
            for (let i = 0; i < data.length; i++) {
                let blogData = `
                        <div id="blog-data-section" class="blog-data-section-class">
                            <div class="blog-content">
                                <h2>${data[i].title}</h2>
                                <p>${data[i].description}</p>
                            </div>
                            <div class="blog-actions">
                                <button onclick="editBlog('${id}','${data[i]._id}','${i}')">Edit</button>
                                <button onclick="deleteBlog('${data[i]._id}')">Delete</button>
                            </div>
                        </div>
                    `
                displayAdminAllBlogsSection.innerHTML += blogData;
            }
        }
    } catch (err) {
        console.log(err);
    }

}

//Function to get Admin data and display it dinamically
/**
 * @async 
 */
const getAdminData = async() => {
    try {
        /**
         * @method GET
         * @headers {Object}
         */
        const res = await fetch('/getNormalAdminDetails', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();

        if (data) {
            document.getElementById('name').innerHTML = data.name;
            let blogButtons = `
                <button class="button-sec" onclick="displayCreateBlogSection('${data._id}')">Create a Blog</button>
                <button class="button-sec" onclick="displayShowBlogSection('${data._id}')">Show all blogs</button>
            `;
            document.getElementById('button-section').innerHTML = blogButtons;
            document.getElementById('nav-link-3').innerHTML = `
                <a class="nav-link" href="javascript:;" onclick="displayCreateBlogSection('${data._id}')">Create Blog</a>
            `
        }
    } catch (err) {
        console.log(err);
    }
};

getAdminData(); //calling function to display admin data

/**
 * Function to fill input fields with existing Data
 * @param {String} adminId 
 * @param {Number} i 
 * @async
 */
const fillInputfields = async(adminId, i) => {
    try {
        const res = await fetch(`/showAdminAllBlogs/${adminId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        if (data) {
            console.log(data[i]);
            formFields.title.value = data[i].title;
            formFields.description.value = data[i].description;
            formFields.markdown.value = data[i].markdown;
            formFields.category.value = data[i].category;
        }

    } catch (err) {
        console.log(err);
    }
}

//Function to edit Blog posts

/**
 * 
 * @param {String} adminId 
 * @param {String} blogId 
 * @param {Number} i 
 * @async 
 */
const editBlog = async(adminId, blogId, i) => {
    displayAdminAllBlogsSection.style.display = 'none';
    editBlogSection.style.display = 'block';
    fillInputfields(adminId, i);
    formFields.addEventListener('submit', async(e) => {
        e.preventDefault();

        // get values 
        const title = formFields.title.value;
        const description = formFields.description.value;
        const markdown = formFields.markdown.value;
        const images = formFields.file.files;
        const category = formFields.category.value;


        try {
            /**
             * @method PUT
             * @body {String}
             * @headers {Object}
             */
            const res = await fetch(`/updateBlog/${blogId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    description,
                    markdown,
                    images,
                    category,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json(); //Getting Response from the server
            if (data) {
                alert('blog updated successfully');
                location.assign('/NormalAdminDashboard');
            } else {
                alert('Failed to update blog');
            }

        } catch (err) {
            console.log(err);
        }
    });
}

//Function to delete a particular blog

/**
 * 
 * @param {String} blogId 
 * @async 
 */
const deleteBlog = async(blogId) => {
    if (confirm('Are you sure you want to delete this blog ?')) {
        try {
            const res = await fetch(`/deleteBlog/${blogId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            if (data.message === 'Blog deleted') {
                alert("Blog deleted successfully!");
                location.assign('/NormalAdminDashboard');
            }

        } catch (err) {
            console.log(err);
        }

    }

}