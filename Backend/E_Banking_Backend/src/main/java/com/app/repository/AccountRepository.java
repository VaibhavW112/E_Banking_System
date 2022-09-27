package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.AccType;
import com.app.pojo.Account;
import com.app.pojo.Customer;

public interface AccountRepository extends JpaRepository<Account, Integer> {

	//list of all accounts
	List<Account> findAll();
	//get account of customer
	Account findByAccountId(int id);
	//get customer by custId
	//Customer findByCustomer(Customer customer);
	
	//for DML operations @Modifying in compulsory
	@Modifying
	@Query("delete from Account a where a.customer.customerId=:custid")
	int deleteAccountsofCustomer(@Param(value = "custid") int custid);
	
	@Query("select a from Account a where a.customer.customerId=:custId")
	List<Account> getAccountByCustId(@Param(value = "custId") int custId);
	
	@Query("select a from Account a where a.requestDebitCard = true and a.isDebitCardAssigned=false")
	List<Account> getAllDebitCardReqAccs();
	
	@Query("select a.customer from Account a where a.accountId=:accId")
    Customer getCustFromaccId(@Param(value = "accId") int accId);
	
	@Query("select a from Account a where a.customer.email=:email and a.accType=:accType")
	Account getAccountsByEmail(@Param(value = "email") String email,@Param(value = "accType") AccType acctype);
	
	
}
