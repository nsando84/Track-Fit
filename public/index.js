
// add evaluation button // 

$('#add-workout-button').on('click', event => {
    const airmanName = $('#airman-name').val()
    const cardioTime = $('#cardio-time-1').val() + $('#cardio-time-2').val()
    const bodyComposition = $('#body-composition').val()
    const pushUps = $('#push-ups').val()
    const sitUps = $('#sit-ups').val()
    if (!airmanName || !cardioTime || !bodyComposition || !pushUps || !sitUps) {
        $('.already-tested-warning').hide()
        $('.all-fields-warning').show()
    } else {
        $('.all-fields-warning').hide()
        $('.already-tested-warning').hide()
        const airMan = {
            airmanName: airmanName,
            cardioTime: cardioTime,
            bodyComposition: bodyComposition,
            pushUps: pushUps,
            sitUps: sitUps,
        }
        addToDb(airMan)
    } 
})


// function to add to db //

function addToDb(exerciseData) {
    $.ajax('/', {
        method: 'POST',
        data: exerciseData
    })
    .then(result => {
        if (result == 'alreadytested') {
            $('.all-fields-warning').hide()
            $('.already-tested-warning').show()
        }
        $('.fitness-form :input').val('')
    })
    .catch(err => console.log(err))

}



// search for an airman //

$('.search-button-wrapper').on('submit', event => {
    event.preventDefault()
    const airmanName = {
        name: $('.search-button-wrapper :input').val()
    }
    $.ajax('/', {
        method: 'GET',
        data: airmanName
    })
    .then(results => {
        makeChart(results)
    })
    .catch(err => console.log(err))

})


// chart making function //


function makeChart(userData) {
    const years = []
    const workoutCardio = []
    const workoutBody = []
    const workoutSitups = []
    const workoutPushups = []
    const workoutTotalScore = []
    
    for (const [keyFitness, valueFitness] of Object.entries(userData.fitness)) {
        for (const [keyYears, valueYears] of Object.entries(valueFitness)) {
            years.push(keyYears)
            for (const [key, value] of Object.entries(valueYears)) {
                switch (key) {
                    case 'cardio':
                        workoutCardio.push(value)
                        break;
                    case 'body':
                        workoutBody.push(value)
                        break;
                    case 'pushups':
                        workoutPushups.push(value)
                        break;
                    case 'situps':
                        workoutSitups.push(value)
                        break;
                    default:
                        workoutTotalScore.push(value)
                }
            } 
        }
    }
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'cardio',
                data: workoutCardio,
                borderColor: "blue",
                borderWidth: 1
            },{
                label: 'body',
                data: workoutBody,
                borderColor: "blue",
                borderWidth: 1
            },{
                label: 'pushups',
                data: workoutSitups,
                borderColor: "blue",
                borderWidth: 1
            },{
                label: 'situps',
                data: workoutPushups,
                borderColor: "blue",
                borderWidth: 1
            },{
                label: 'total score',
                data: workoutTotalScore,
                borderColor: "blue",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    plotLines: [{
                        color: '#FF0000',
                        width: 2,
                        value: 75
                    }]
                }]
            },
            annotation: {
                drawTime: "afterDatasetsDraw",
                annotations: [{
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: '75',
                    borderColor: 'red',
                    borderWidth: 1
                }],     
            }
        }
    });









}



