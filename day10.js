const express = require('express');
const path = require('path');

const app = express();
const publicDirectoryPath = path.join(__dirname, 'public');


app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
