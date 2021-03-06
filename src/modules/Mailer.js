var fs = require('fs');
const nodemailer = require("nodemailer");
var handlebars = require('handlebars');
const editJsonFile = require("edit-json-file");
var conf = editJsonFile(__root+__core+'config.json');
var Mailer={};

const Status ={
	"NULL":null
}

let transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 25,
	auth: {
		user: 'swathikathir98@gmail.com',
		pass:"rubaswathi3211"
	}
});
				
Mailer.sendMail=function(path,payload,report_mail,cc_mail_status,html_payload,attach_data,subject,cb){
	var template,replacements,htmlToSend,mailOptions={};
	mailOptions = {
		from: 'swathikathir98@gmail.com',
		to: report_mail,
		subject:  subject,
	};
	if(attach_data){
		mailOptions['encoding']= 'base64'
		mailOptions['attachments']=attach_data
	}

	function sendmail(){
		transporter.sendMail(mailOptions, function(e, r) {
			if (e) {
			  conf.get("D") && console.log(e);
			  cb && cb(1);
			}
			else {
			  conf.get("D") &&  console.log(r);
			  cb && cb(0);
			}
			transporter.close();
		});
	}

	if(path){
		fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
			if (err) {
				throw err;
				callback(err);
			}
			else {
				template = handlebars.compile(html);
				replacements = payload
				htmlToSend = template(replacements);
				mailOptions['html']=htmlToSend;
				sendmail();
			}
		});
	}
	else{
		if(payload && !html_payload) {mailOptions['text']=payload};
		if(html_payload && !payload) {mailOptions['html']=html_payload};
		sendmail();
	}	
	
}

module.exports = Mailer;
