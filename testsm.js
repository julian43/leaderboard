// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var helper = require('sendgrid').mail

from_email = new helper.Email("test@example.com")
to_email = new helper.Email("cowelljulian77@gmail.com")
subject = "Sending with SendGrid is Fun"
content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
mail = new helper.Mail(from_email, subject, to_email, content)

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var fs = require('fs')
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});

sg.API(request, function(error, response) {
  //console.log(response.statusCode)
  //console.log(response.body)
  //console.log(response.headers)
  fs.open('sgfile', 'wx', (err, fd) => {
    if (err) {
      if (err.code === "EEXIST") {
        console.error('myfile already exists');
        return;
      } else {
        throw err;
      }
    }
    var responses = {
      statusCode: response.statusCode,
      body: response.body,
      headers: response.headers
    }
    fs.write(fd, responses, function(err, written, string){
      console.dir(string);
      console.log(response.statusCode);
      console.log(response.body)
    })
  });
})
