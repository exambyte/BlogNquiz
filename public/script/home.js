const getDisplayNone = () => {
    document.getElementById('logout').style.display = "none";
}
const getDisplay = () => {
    document.getElementById('logout').style.display = "inline";
}

const userHome = async() => {
    try {
        const res = await fetch('/getData', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });

        const data = await res.json();
        if (data) {
            console.log(data)
            getDisplay();
            document.getElementById('name').innerHTML = `HI ${data.name}`;
            document.getElementById('email').innerHTML = `Your Email: ${data.email}`;
            document.getElementById('userId').innerHTML = `Your Id: ${data._id}`;
        }
    } catch (err) {
        getDisplayNone()
        console.log(err)
    }
}


userHome();
getAllData();