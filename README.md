# SourceGrade

[SourceGrade](http://www.sourcegrade.xyz/) is a web scraping app built with MongoDB, Express.js, Node.js, React, and Redux for [GradeSource](http://www.gradesource.com/). SourceGrade is designed to make your life easier by finding all your scores for a particular class on GradeSource, and presenting all the data in a meaningful and elegant way. It also allows you to create accounts to save all your information for a class so that you never have to remember your secret number or course url again!

## Usage

1) Add your class url [here](http://www.sourcegrade.xyz/add) if it hasn't already been previously added.

2) Enter your Secret Number and Class in the input fields

![enter info](https://github.com/joelseq/SourceGrade/blob/master/img/image1.png)

3) View your scores and statistics for each assessment or category.

![view scores](https://github.com/joelseq/SourceGrade/blob/master/img/image2.png)

![view scores 2](https://github.com/joelseq/SourceGrade/blob/master/img/image3.png)

In addition, if you want to use the API directly the route is:

`http://www.sourcegrade.xyz/api/scrape?id={secret number}&url={class url}`

Example API Request:

`http://www.sourcegrade.xyz/api/scrape?id=8010&url=http://www.gradesource.com/demo/example1/index.html`

## Install and run locally

To install and run this on your local machine you need [MongoDB](https://www.mongodb.com/)

1. Clone this repository
2. Run `npm install`
3. Start MongoDB
4. Create a `.env` file in the main directory, providing the two environment variables DB_URI (url to your MongoDB server) and SECRET (secret for encrypting JSONWebTokens).
Example:
```
DB_URI=mongodb://localhost:27017/sourcegrade
SECRET=supercoolsecret
```
5. Run the server `node bin/www`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Contributions are always welcome!

## Credits

Chris Korkos for the designs.

## Misc.

Source code for old version available [here](https://github.com/joelseq/SourceGrade-Old)
