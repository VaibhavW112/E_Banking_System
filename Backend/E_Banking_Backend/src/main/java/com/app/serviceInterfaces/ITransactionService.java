package com.app.serviceInterfaces;

import java.util.List;

import com.app.pojo.Transaction;

public interface ITransactionService {

	public List<Transaction> getAllTransactions();
	
	 String moneyTransfer(int senderAccountNo, int receiverAccountNo, Double amount) ;
	 
     List<Transaction> getAccountTransactions(int accNo);

}