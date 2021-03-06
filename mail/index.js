var helper = require('sendgrid').mail

module.exports = function(tomail, verifyuuid){

	from_email = new helper.Email("restaurant@example.com")
	to_email = new helper.Email(tomail)
	subject = "Hello World from the SendGrid Node.js Library"
	content = new helper.Content("text/plain", "yes, this is our app sending emails now! :)")
	mail = new helper.Mail(from_email, subject, to_email, content)

	var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)
	var requestBody = mail.toJSON()
	var request = sg.emptyRequest()

	request.method = 'POST'
	request.path = '/v3/mail/send'
	request.body = requestBody

	sg.API(request, function (response) {
		console.log(response.statusCode)
		console.log(response.body)
		console.log(response.headers)
	})
	
}