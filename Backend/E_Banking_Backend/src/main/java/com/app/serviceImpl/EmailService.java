package com.app.serviceImpl;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class EmailService {

	@Autowired
	private JavaMailSender sender;

	public void sendMail(String emailId, String subject, String text) throws MessagingException {

		// System.out.println(activeCust.getDestEmail()+" "+activeCust.getMessage());
		SimpleMailMessage mesg = new SimpleMailMessage();
		
		mesg.setTo(emailId);
		
		mesg.setSubject(subject);

		mesg.setText(text);
		
		sender.send(mesg);
		
		System.out.println("Email sent succesfully");
	}

}
