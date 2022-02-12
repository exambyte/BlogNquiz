const formFields = document.querySelector('form');

//function to create a blog Post 

/**
 * Function to send a request to save a blog post to the server
 * @param {String} id 
 */
const postBlog = (id) => {
    formFields.addEventListener('submit', async(e) => {
        e.preventDefault();

        // get values 
        const title = formFields.title.value;
        const description = formFields.description.value;
        const markdown = formFields.markdown.value;
        const images = formFields.file.files;
        const category = formFields.category.value;
        console.log(images)

        try {
            const res = await fetch(`/addBlog/${id}`, {
                method: 'POST',
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

            const url = await res.url;
            // console.log(url)
            location.assign(url);

        } catch (err) {
            console.log(err);
        }
    });
};


//function to get admin id

/**
 * @async
 */
const getAdminId = async() => {

    try {
        const res = await fetch('/getNormalAdminDetails', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();

        if (data) {
            postBlog(data._id);
        }

    } catch (err) {

    }
};

getAdminId(); //Calling the function to get the admin id from database