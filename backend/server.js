import express from 'express'
const port = 5000;

const app =express();

app.get('/')

app.listen(port,()=> console.log(`Server started on port ${port}`));