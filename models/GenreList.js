const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'genreList.json');

const GenreList = {
    all: function () {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
    },
}

module.exports = GenreList;