package com.app.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.pojo.Account;
import com.app.pojo.Complaint;
import com.app.pojo.Customer;
import com.app.pojo.DebitCard;
import com.app.pojo.Transaction;
import com.app.repository.AccountRepository;
import com.app.repository.ComplaintRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.DebitcardRepository;
import com.app.repository.TransactionRepository;
import com.app.serviceInterfaces.ICustomerService;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService {

	@Autowired
	private CustomerRepository custRepo;

	@Autowired
	private AccountRepository accRepo;

	@Autowired
	private TransactionRepository txRepo;

	@Autowired
	private ComplaintRepository complRepo;

	@Autowired
	private DebitcardRepository dcRepo;

	@Autowired
	private PasswordEncoder enc;
	
	@Autowired
	private EmailService emailService;

	@Override
	public Customer login(String email, String password) {

		Customer activeCust = custRepo.findByEmailAndPassword(email, password);
		if (activeCust != null) {
			List<Account> accs = accRepo.getAccountByCustId(activeCust.getCustomerId());

			for (Account a : accs) {
				if (a.isNetBankingActive())
					return activeCust;
			}

		}
		return null;
	}

	// get all active customers
	@Override
	public List<Account> getAllActiveCustomers() {

		List<Account> allAccts = accRepo.findAll();

		List<Account> allActiveCusts = new ArrayList<Account>();
		for (Account acc : allAccts) {
			if (acc.isNetBankingActive()) {

				allActiveCusts.add(acc);
			}
		}

		return allActiveCusts;
	}

	// get all pending customers
	@Override
	public List<Account> getAllPendingCustomers() {

		List<Account> allAccts = accRepo.findAll();

		List<Account> allPendingCustsAccs = new ArrayList<Account>();
		for (Account acc : allAccts) {
			if (!acc.isNetBankingActive()) {

				allPendingCustsAccs.add(acc);
			}
		}

		return allPendingCustsAccs;

	}

	// delete a Customer
	@Override
	public boolean deleteCustomer(int custId) {

		Customer cust = custRepo.getByCustomerId(custId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid emp id !!!!!!" + custId));

		List<Account> accs = accRepo.getAccountByCustId(custId);

		for (Account a : accs) {

			List<Transaction> transactions = txRepo.getAccountTransactions(a.getAccountId());
			List<Complaint> complaints = complRepo.getAllComplaints(a.getAccountId());
			DebitCard dc = dcRepo.getDebitcardFromAccount(a.getAccountId());

			if(dc!=null)
			dcRepo.delete(dc);
			if(transactions.size()!=0)
			txRepo.deleteAll(transactions);
			if(complaints.size()!=0)
			complRepo.deleteAll(complaints);
		}
			accRepo.deleteAll(accs);

			custRepo.delete(cust);
			return true;

		}
	

	@Override
	public String changePassword(int custId, String newPassword, String confirmNewPassword, String oldPassword) {
		Customer persistCust = custRepo.getById(custId);
		if (newPassword.equals(confirmNewPassword)) {
			if (enc.matches(oldPassword, persistCust.getPassword())) {
				persistCust.setPassword(enc.encode(newPassword));
				custRepo.save(persistCust);
				return "Password changed Successfully...!!";

			} else
				return "Old Password Not Matching ....!! ";
		} else
			return "Confirm password again ....!! ";

	}

	@Override
	public void createCustomer(Customer cust) {
		custRepo.save(cust);
	}

	@Override
	public Customer getCustomerByEmail(String email) {

		return custRepo.findByEmail(email);
	}

	@Override
	public String forgotpassword(String email) throws MessagingException {
		Customer cust=custRepo.findByEmail(email);
		
		if(cust==null)
			throw new BadCredentialsException(email);
		
		int pass = (int) Math.floor(Math.random() * 1000000);
		
		String password = String.valueOf(pass);
		
		cust.setPassword(enc.encode(password));
		
		String text = "Hello , " + cust.getFname()
		+ "\n Forgot Your Password? \n"
		+ "We Received a Request To Reset the Password For Your Account."
		+ "\n\n Your New password : "+password
		+ "\n , Please Do Not Share Your Password With Anyone";

        emailService.sendMail(cust.getEmail(), "E-Bank Forgot Password", text);
		return "New Password Has Been Sent To Email Id";
	}
	
	

}
