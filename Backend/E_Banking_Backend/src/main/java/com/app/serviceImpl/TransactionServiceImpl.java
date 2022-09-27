package com.app.serviceImpl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojo.Account;
import com.app.pojo.Transaction;
import com.app.pojo.TransactionType;
import com.app.repository.AccountRepository;
import com.app.repository.TransactionRepository;
import com.app.serviceInterfaces.ITransactionService;

@Service
@Transactional
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private TransactionRepository txRepo;
	
	@Autowired
	private AccountRepository accRepo;

	// get all transactions done by all customers
	@Override
	public List<Transaction> getAllTransactions() {

		List<Transaction> allTxs = txRepo.findAll();

		return allTxs;
	}

	@Override
	public String moneyTransfer(int senderAccountNo, int receiverAccountNo, Double amount) {
System.out.println(senderAccountNo);
System.out.println(receiverAccountNo);
System.out.println(amount);
		if (senderAccountNo == receiverAccountNo)
			return "Your and Beneficiary account numbers must be Different";

		Account senderAccount = accRepo.findByAccountId(senderAccountNo);
		Account receiverAccount = accRepo.findByAccountId(receiverAccountNo);

		if (senderAccount == null || receiverAccount == null)
			return "Account not found..!! Please check account number and re-enter";
		if (senderAccount.isNetBankingActive() && receiverAccount.isNetBankingActive()) {

			if (senderAccount.getBalance() > amount) {

				senderAccount.setBalance(senderAccount.getBalance() - amount);
				receiverAccount.setBalance(receiverAccount.getBalance() + amount);
				if (accRepo.save(senderAccount) != null && accRepo.save(receiverAccount) != null) {
					// crediting
					Transaction transaction1 = new Transaction(amount, receiverAccountNo, TransactionType.DEBIT, true,
							senderAccount);
					// Debit
					Transaction transaction2 = new Transaction(amount, senderAccountNo, TransactionType.CREDIT, true,
							receiverAccount);
					transaction1 = txRepo.save(transaction1);

					transaction2 = txRepo.save(transaction2);

					return "Transaction done Successfully";
				}
			}

			return "Insufficient Balance ..!! Transaction failed..!!";

		} else
			return "Your net banking is not activated !! Please Activate through your Registered Email";
	}

	@Override
	public List<Transaction> getAccountTransactions(int accNo) {
		
		return txRepo.getAccountTransactions(accNo);
		
		
	}

}
