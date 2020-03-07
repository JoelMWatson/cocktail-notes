const request = require('request');

const search = (search, callback) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to recipes service!");
        } else if (response.body.drinks === null) {
            callback('No matching drinks found');
        } else {
            callback(undefined, response.body.drinks);
        }
    });
};

module.exports = { search };