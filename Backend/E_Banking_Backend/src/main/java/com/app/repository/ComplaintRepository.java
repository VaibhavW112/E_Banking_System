package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojo.Complaint;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {

	//list of all complaints
	List<Complaint> findAll();
	//find all complaint of individual customer
	
	@Query("select c from Complaint c where c.account.accountId=:accId")
	
	List<Complaint> getAllComplaints(@Param(value = "accId") int accId);
}
