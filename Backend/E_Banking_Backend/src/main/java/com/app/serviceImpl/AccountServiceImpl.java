package com.app.serviceImpl;

import java.util.List;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.app.pojo.AccType;
import com.app.pojo.Account;
import com.app.pojo.Customer;
import com.app.repository.AccountRepository;
import com.app.repository.CustomerRepository;
import com.app.serviceInterfaces.IAccountService;

@Service
@Transactional
public class AccountServiceImpl implements IAccountService {

	@Autowired
	private AccountRepository accRepo;

	@Autowired
	private CustomerRepository custRepo;

	@Autowired
	private EmailService emailService;

	// approved customer request & activate account
	@Override
	public boolean approvedCustomer(int accNo) throws MessagingException {
		Account acc = accRepo.getById(accNo);// throws exception if id is wrong

		Customer cust = custRepo.findCustomer(acc.getCustomer().getCustomerId());

		String text = "Hello , " + cust.getFname()
				+ "\n Your Bank Account is now Activated By E-Bank You can now use the services of our Bank.";
				

		emailService.sendMail(cust.getEmail(), "E-Bank Account is Activated ", text);

		acc.setNetBankingActive(true);

		return true;
	}

	@Override
	public boolean rejectCustomerRequest(int accId) {
		Account acc = accRepo.getById(accId);// child entity

		Customer cust = custRepo.getById(acc.getCustomer().getCustomerId());// parent entity

		// delete account & Customer also
		accRepo.delete(acc);

		if (accRepo.getAccountByCustId(cust.getCustomerId()) == null)
			custRepo.delete(cust);

		return true;
	}
	
	@Override
	public double accountBalance(int accId) {
		Account acc = accRepo.getById(accId);
		return acc.getBalance();

	}

	@Override
	public String createAccount(Account acc) {

		accRepo.save(acc);

		return "Account Created Succesfully";
	}

	@Override
	public List<Account> getAccountByCustomerId(int custId) {

		return accRepo.getAccountByCustId(custId);
	}
	
	@Override
	public Account getAccountByEmailIdAndAccType(String email,AccType accType) {
		Account acc = accRepo.getAccountsByEmail(email,accType);
		if(acc==null )
		throw new BadCredentialsException("Wrong Acc type ");
		if(!acc.isNetBankingActive())
			throw new BadCredentialsException("Account is not activated Yet .... !!!!!!!!");
		
		return acc;
	}
}
