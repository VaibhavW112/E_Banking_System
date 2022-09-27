package com.app.serviceInterfaces;

import java.util.List;

import com.app.pojo.Complaint;

public interface IComplaintService {

	List<Complaint> getAllComplaints();
	
	boolean registerComplaint(int accId , Complaint comp);
	
	List<Complaint> getAllCustomersComplaints(int accId);

	
}
