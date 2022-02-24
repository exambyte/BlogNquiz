const user_tests_section = document.getElementById('test-list-section');


const getAllTestData = async()=>{
    try{
        const res = await fetch('/allTests',{
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        });
        
        const testData = await res.json();
        if(testData){
            for(let i =0;i<testData.length;i++){
                let date = new Date(testData[i].createdAt);

                user_tests_section.innerHTML+=`
                    <div class="test-data">
                        <div class="test Title">
                            <h2>${testData[i].title}</h2>
                        </div>
                        <div class="test-details">
                            <p>No. Of Questions:&nbsp${testData[i].noOfQestions}</p>
                            <p>Created On:&nbsp${date.toLocaleDateString()}</p>
                        </div>
                        <div class="test-link">
                            <a href="/mcq/${testData[i].slug}" target="_blank">Take Quiz</a>
                        </div>
                    </div>
                `
            }
        }
    }catch(err){
        console.log(err);
    }

}
getAllTestData();