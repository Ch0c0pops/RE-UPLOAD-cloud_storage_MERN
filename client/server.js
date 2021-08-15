const express = require('express')
const path = require('path')
// import express from "express"
// import path, {dirname} from "path"
// import { fileURLToPath } from 'url'
//
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static(__dirname)) // раздаем статику (css стили, картинки и прочее) из корневой папки
app.use(express.static(path.resolve(__dirname, 'build'))) // и из папки build

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
}) // при обновлении страницы с адресом, отличным от / мы не получили бы приложение, в этом app.get() мы задаем чтобы
    // при любых get запросах пользователю будет раздан index.html, чтобы избежать такой проблемы

app.listen(PORT)

