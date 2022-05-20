const express = require('express')
const cors = require('cors')
const app = express()

const corsOptions = {
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.post('/submit', (req, res) => {
    // console.log(req.body);
    let { questionId, output } = req.body
    let passed = checkAnswer(questionId, output)


    setTimeout(() => {
        let code = passed ? Types.AnswerCorrect : Types.AnswerError
        let msg = passed ? '回答正确' : '回答错误'
        res.send({ code, msg })
    }, 1000);
})

app.listen(3003, () => {
    console.log('express server running at http://127.0.0.1:' + 3003);
})



// Function Wrap

const questionSet = require('./questionSet_Server.json').questions

const Types = {
    'AnswerError': 0,
    'AnswerCorrect': 1
}

function checkAnswer(questionId, output) {
    let question = questionSet[questionId]
    let answer = question.answer
    answer = answer.join('\n')

    if(output.trim() === answer) {
        return true
    } else {
        return false
    }
}