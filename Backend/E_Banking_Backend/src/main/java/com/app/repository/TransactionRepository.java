package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

	//list of all transactions
	List<Transaction> findAll();
	//find all transaction of individual customer
	
	@Query("select t from Transaction t where t.account.accountId=:accId")
	List<Transaction> getAccountTransactions(@Param(value = "accId") int accId);

}
