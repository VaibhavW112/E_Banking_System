package com.app.serviceInterfaces;

import java.util.List;

import javax.mail.MessagingException;

import com.app.pojo.Account;

public interface IDebitCardService {
	
	String approvedDebitCardRequest(int accId) throws MessagingException;
	
	boolean rejectDebitCardRequest(int accId);
	
	String requestDebitCard(int accId);
	
	List<Account> getAllDebitCardRequest();

}
