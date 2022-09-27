package com.app.serviceImpl;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojo.Account;
import com.app.pojo.Complaint;
import com.app.repository.AccountRepository;
import com.app.repository.ComplaintRepository;
import com.app.serviceInterfaces.IComplaintService;

@Service
@Transactional
public class ComplaintServiceImpl implements IComplaintService {

	@Autowired
	private ComplaintRepository complaintRepo;
	
	@Autowired
	private AccountRepository accRepo;

	// get all complaints done by all customers
	@Override
	public List<Complaint> getAllComplaints() {

		List<Complaint> allComplaints = complaintRepo.findAll();

		return allComplaints;
	}

	@Override
	public boolean registerComplaint(int accId, Complaint comp) {
		
		Account acc =accRepo.getById(accId);
		
		comp.setAccount(acc);
		comp.setDate(LocalDate.now());
		complaintRepo.save(comp);
		
		
		return false;
	}

	@Override
	public List<Complaint> getAllCustomersComplaints(int accId) {
		
		return complaintRepo.getAllComplaints(accId);
	}
	
	
}
