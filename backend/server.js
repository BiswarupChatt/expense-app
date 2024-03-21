const express = require('express')
const mongoose = require('mongoose')
const { checkSchema, validationResult } = require('express-validator')
const app = express()
const port = 3066

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/expense-app-project')
    .then(() => {
        console.log(`DataBase '/expense-app-project' is running `)
    })
    .catch((err) => {
        console.log(err)
    })

const { Schema, model } = mongoose

const categorySchema = new Schema({
    name: {
        type: String
    }
}, { timestamps: true })

const Category = model('Category', categorySchema)

const categorySchemaValidation = {
    name: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'name cannot be empty'
        }
    }
}

const idValidationSchema = {
    id: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'id should be a valid mongo id'
        }
    }
}

app.post('/category', checkSchema(categorySchemaValidation), (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const body = req.body
    Category.create(body)
        .then((response) => {
            res.status(201).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' })
        })
})

app.get('/category', (req, res) => {
    Category.find()
        .then((response) => {
            res.status(201).json(response)
        })
        .catch(() => {
            res.status(500).json({ error: "Internal server error" })
        })
})

app.get('/category/:id', checkSchema(idValidationSchema), (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const id = req.params.id
    Category.findById(id)

        .then((response) => {
            if (!response) {
                return res.status(400).json({})
            }
            res.status(201).json(response)
        })
        .catch((err) => {
            res.status(500).json({ error: 'Internal Server Error' })
        })
})

// app.put()

// app.delete()




app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})