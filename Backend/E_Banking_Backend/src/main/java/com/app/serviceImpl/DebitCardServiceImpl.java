package com.app.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import javax.mail.MessagingException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojo.Account;
import com.app.pojo.Customer;
import com.app.pojo.DebitCard;
import com.app.repository.AccountRepository;
import com.app.repository.DebitcardRepository;
import com.app.serviceInterfaces.IDebitCardService;

@Service
@Transactional
public class DebitCardServiceImpl implements IDebitCardService {

	@Autowired
	private AccountRepository accRepo;
	
	@Autowired
	private DebitcardRepository debitCardRepo;
	
	@Autowired
	private EmailService emailService;

	@Override
	public String approvedDebitCardRequest(int accId) throws MessagingException {
		Account acc = accRepo.getById(accId);

		boolean isCardPresentAlready = acc.isDebitCardAssigned();

		if (isCardPresentAlready) {
			return "Card is Already present for this Account ";
		}

		if (acc.getBalance() < 200)
			return "You Have Insufficient Balance";

		// charged for Debit Card
		acc.setBalance(acc.getBalance() - 200);

		DebitCard dc = new DebitCard();
		// create random cvv
		int cvv = (int) Math.floor(Math.random() * 1000);
		System.out.println("CVV : " + cvv);
		// create random pin
		int pin = (int) Math.floor(Math.random() * 10000);
		System.out.println("PIN : " + pin);
		// create random card no.
		int cardNo1 = (int) Math.floor(Math.random() * 100000000);
		int cardNo2 = (int) Math.floor(Math.random() * 100000000);
		long cardNo = Long.parseLong(cardNo1 + "" + cardNo2);
		System.out.println("Card No : " + cardNo);

		dc.setCardNo(cardNo);
		dc.setCvv(cvv);
		dc.setPin(pin);
		dc.setExpDate(LocalDate.of(2027,12,31));
		dc.setCardActive(true);
		dc.setAccount(acc);
		
		debitCardRepo.save(dc);

		acc.setDebitCardAssigned(true);
		
		Customer c =accRepo.getCustFromaccId(accId);
		
		String text="Hello , "+c.getFname()+" Your Debit Card is Activated with DebitCard Details : "
				+ "Card No : "+cardNo;
		
		emailService.sendMail(c.getEmail(), "Debit card request is Accepted ",text);

		return "Debit Card Request is Accepted";
	}

	@Override
	public boolean rejectDebitCardRequest(int accId) {
		Account acc = accRepo.getById(accId);

		acc.setRequestDebitCard(false);
		return true;
	}

	@Override
	public String requestDebitCard(int accId) {
		Account acc = accRepo.getById(accId);

		boolean isCardPresentAlready = acc.isDebitCardAssigned();
		boolean isNetbankingActive = acc.isNetBankingActive();

		if (isNetbankingActive) {
			if (isCardPresentAlready)
				return "Debit Card is alredy assigned to you";
			else {
				acc.setRequestDebitCard(true);
				return "Request sent succesfully";
			}
		} else
			return "Your Account is Not Active";

	}

	@Override
	public List<Account> getAllDebitCardRequest() {

		return accRepo.getAllDebitCardReqAccs();
	}

}
