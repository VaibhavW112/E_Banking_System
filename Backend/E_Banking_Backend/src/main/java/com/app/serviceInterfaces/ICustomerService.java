package com.app.serviceInterfaces;

import java.util.List;

import javax.mail.MessagingException;

import com.app.pojo.Account;
import com.app.pojo.Customer;

public interface ICustomerService {

	Customer login(String email,String password);
	
	
	 List<Account> getAllActiveCustomers();
	
	 List<Account> getAllPendingCustomers();
	
	 boolean deleteCustomer(int custId);
	 
	 String changePassword(int custId , String newPassword , String confirmNewPassword,String oldPassword);
	 
	 void createCustomer (Customer cust);
	
	 Customer getCustomerByEmail(String email);
	 
	 String forgotpassword(String email) throws MessagingException  ;
	
	
}
