const quizChart = document.getElementById('topicIqChart').getContext('2d');
const iqChart = document.getElementById('iqChart').getContext('2d');
const heighestScore = document.getElementById('heigest-score');
const pointsEarned = document.getElementById('points-earned');
const myProfileBtn = document.getElementById('my-profile-btn');
const quizCardArea = document.getElementById('quiz-card-area');
const bestScoreTest = document.getElementById('best-score-test');
const experienceIq = document.getElementById('experience-iq');

let userID = '';

let userQuizData = [];
let current_page = 1;
let records_per_page = 2;

const prevPage = () => {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}
const nextPage = () => {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

const changePage = (page) => {
    let btn_next = document.getElementById("btn_next");
    let btn_prev = document.getElementById("btn_prev");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    quizCardArea.innerHTML = "";

    for (let i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        quizCardArea.innerHTML += `
        
        <div class="card-group-row__col col-md-6">

        <div class="card card-group-row__card card-sm">
            <div class="card-body d-flex align-items-center">
                <a href="student-take-quiz.html"
                   class="avatar overlay overlay--primary avatar-4by3 mr-12pt">
                    <img src="/Theme/images/paths/typescript_200x168.png"
                         alt="Introduction to TypeScript"
                         class="avatar-img rounded">
                    <span class="overlay__content"></span>
                </a>
                <div class="flex mr-12pt">
                    <a class="card-title"
                       href="student-take-quiz.html">${userQuizData[i].test.title}</a>
                    <div class="card-subtitle text-50">No. of Questions:&nbsp${userQuizData[i].test.noOfQestions}</div>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <span class="lead text-headings lh-1">${userQuizData[i].marksScored}</span>
                    <small class="text-50 text-uppercase text-headings">Score</small>
                </div>
            </div>

            <div class="progress rounded-0"
                 style="height: 4px;">
                <div class="progress-bar bg-primary"
                     role="progressbar"
                     style="width: 100%;"
                     aria-valuenow="37"
                     aria-valuemin="0"
                     aria-valuemax="100"></div>
            </div>

            <div class="card-footer">
                <div class="d-flex align-items-center">
                    <div class="flex mr-2">
                        <a href="/mcq/Quiz?slug=${userQuizData[i].test.slug}&userID=${userID}"
                           class="btn btn-light btn-sm">

                            <i class="material-icons icon--left">refresh</i> Continue

                        </a>
                    </div>

                    <div class="dropdown">
                        <a href="#"
                           data-toggle="dropdown"
                           data-caret="false"
                           class="text-muted"><i class="material-icons">more_horiz</i></a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="student-take-quiz.html"
                               class="dropdown-item">Continue</a>
                            <a href="student-quiz-result-details.html"
                               class="dropdown-item">View Result</a>
                            <div class="dropdown-divider"></div>
                            <a href="student-take-quiz.html"
                               class="dropdown-item text-danger">Reset Quiz</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
        
        
        `
    }

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}




const numPages = () => {
    return Math.ceil(userQuizData.length / records_per_page);
}




const getUserQuizData = async (userId) => {
    const coloPicker = ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)','rgb(179, 245, 0)','rgb(162, 179, 174)']
    userID = userId;
    try {
        const res = await fetch(`/userQuizData/${userId}`, {
            method: 'GET',
            contentType: 'application/json'
        });

        const data = await res.json();
        if (data) {
            console.log(data);
            let labeldata = []; //Array for labels of graph
            let marksdata = []; //Array for marks data in graph
            data.userQuizes.sort((a,b)=>(a.marksScored > b.marksScored)?1:-1);
            data.userQuizes.reverse();
            data.userQuizes.forEach(element => {
                marksdata.push(element.marksScored);
                labeldata.push(`${element.test.title}`);
                userQuizData.push(element);
            })
            
            // userQuizData.sort((a,b)=>
            //     (a.marksScored > b.marksScored)?1:-1)
            // console.log(userQuizData.reverse());
            
            let highScore = marksdata[0]; //variable to show highest Score
            let highScoreTest = labeldata[0]; //getting test having highest Score

            heighestScore.innerHTML = highScore;
            pointsEarned.innerHTML = `${data.userPoints} points earned`;
            bestScoreTest.innerHTML = `${highScoreTest}`;
            experienceIq.innerHTML = `${data.userPoints}`

            myProfileBtn.innerHTML = `
                <a href="/userProfile/${data.userId}" class="btn btn-outline-secondary">My Profile</a>
            `

            const myChart = new Chart(quizChart, {
                type: 'doughnut',
                data: {
                    labels: labeldata.slice(0,5),
                    datasets: [{
                        label: 'Quiz Stats',
                        data: marksdata.slice(0,5),
                        // fill: false,

                        // borderColor: 'rgb(75, 192, 192)',
                        // tension: 0.5
                        backgroundColor: coloPicker.slice(0,marksdata.length),
                          hoverOffset: 4
                    }]
                }
            });

            let labeldata1 = [];
            let marksdata1 = [];
            data.userQuizes.forEach(element => {
                marksdata1.push(element.marksScored);
                labeldata1.push(`${element.test.title}`);
                
            })
            const myIqChart = new Chart(iqChart, {
                type: 'line',
                data: {
                    labels: labeldata1.slice(0,5),
                    datasets: [{
                        label: 'IQ Stats',
                        data: marksdata.slice(0,5),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.5
                    }]
                }
            });
            changePage(1);

        }
    } catch (err) {
        console.log(err);
    }
}