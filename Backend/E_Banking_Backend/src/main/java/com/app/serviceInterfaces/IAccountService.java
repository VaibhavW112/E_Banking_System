package com.app.serviceInterfaces;

import java.util.List;

import javax.mail.MessagingException;

import com.app.pojo.AccType;
import com.app.pojo.Account;

public interface IAccountService {

	 boolean approvedCustomer(int accNo) throws MessagingException;
	 
	 boolean rejectCustomerRequest(int accId);
	 
	 double accountBalance(int accId);
	 
	 String createAccount(Account acc );
	 
	 List<Account> getAccountByCustomerId(int custId);
	 

	 Account getAccountByEmailIdAndAccType(String email,AccType accType);
	
	 
}
