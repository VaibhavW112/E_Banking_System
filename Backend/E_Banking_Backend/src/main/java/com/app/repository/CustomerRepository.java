package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	//customer login
	Customer findByEmailAndPassword(String email,String password);
	//find by email
	Customer findByEmail(String email);
	//find all customers 
	List<Customer> findAll();
	
	Optional<Customer> getByCustomerId(int custId);
	
	
  @Query("select c from Customer c where c.customerId =:custId")
  Customer findCustomer(@Param(value = "custId") int custId);
}
