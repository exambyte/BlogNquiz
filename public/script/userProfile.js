const quizChart = document.getElementById('quizChart').getContext('2d');
const iqChart = document.getElementById('iqChart').getContext('2d');
const heighestScore = document.getElementById('heigest-score');
const bestScoreTest = document.getElementById('best-score-test');

const getUserQuizData = async (userId)=>{
    const coloPicker = ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)','rgb(179, 245, 0)','rgb(162, 179, 174)']
    try{
        const res = await fetch(`/userQuizData/${userId}`,{
            method:'GET',
            contentType:'application/json'
        });
        
        const data = await res.json();
        if(data){
            console.log(data);
            let labeldata=[]; //Array for labels of graph
            let marksdata=[]; //Array for marks data in graph
            
            data.userQuizes.sort((a,b)=>(a.marksScored > b.marksScored)?1:-1);
            data.userQuizes.reverse();
            data.userQuizes.forEach(element => {
                marksdata.push(element.marksScored);
                labeldata.push(`${element.test.title}`);
                
            })
            
            let highScore = marksdata[0]; //variable to show highest Score
            let highScoreTest = labeldata[0];
            heighestScore.innerHTML = highScore;
            bestScoreTest.innerHTML = highScoreTest;

            const myChart = new Chart(quizChart,{
                type:'radar',
                data:{
                    labels:  labeldata,
                    datasets: [{
                        label: 'Quiz Stats',
                        data: marksdata,
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: 'rgb(255, 99, 132)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 99, 132)'
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

        }
    }catch(err){
        console.log(err);
    }
}