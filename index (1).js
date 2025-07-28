import express from 'express';
const app = express();

app.get('/', (_, res) => res.send('AI-Lena backend działa!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
