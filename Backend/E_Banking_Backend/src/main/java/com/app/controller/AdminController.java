package com.app.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.serviceInterfaces.IAccountService;
import com.app.serviceInterfaces.IComplaintService;
import com.app.serviceInterfaces.ICustomerService;
import com.app.serviceInterfaces.IDebitCardService;
import com.app.serviceInterfaces.ITransactionService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

	public AdminController() {
		System.out.println("in admin controller");
	}

	@Autowired
	private ICustomerService customerService;

	@Autowired
	private IAccountService accountService;

	@Autowired
	private ITransactionService transactionService;

	@Autowired
	private IComplaintService complaintService;

	@Autowired
	private IDebitCardService debitCardService;


	// list of active customers
	@GetMapping("/customerlist")
	public ResponseEntity<?> fetchAllActiveCustomers() {

		System.out.println("in fetch all customer ");

		if (customerService.getAllActiveCustomers().size() != 0)
			return ResponseEntity.ok(customerService.getAllActiveCustomers());
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	// list of pending customers
	@GetMapping("/pendingcustomerlist")
	public ResponseEntity<?> fetchAllPendingCustomers() {

		System.out.println("in fetch all customer ");

		
			return ResponseEntity.ok(customerService.getAllPendingCustomers());
	
	}

	// delete a customer
	@DeleteMapping("/deletecustomer/{custId}")
	public ResponseEntity<?> deleteCustomer(@PathVariable int custId) {
		boolean status = customerService.deleteCustomer(custId);
		if (status) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// accepting customer request
	@PutMapping("/approveuserrequest/{accId}")
	public ResponseEntity<?> approveCustomer(@PathVariable int accId) throws MessagingException {
		System.out.println("inside adminController::approveCustomer method ");

		return ResponseEntity.ok(accountService.approvedCustomer(accId));

	}

	@DeleteMapping("/rejectuserrequest/{accId}")
	public ResponseEntity<?> rejectCustomer(@PathVariable int accId) {
		System.out.println("inside adminController::rejectCustomer method ");

		accountService.rejectCustomerRequest(accId);

		return ResponseEntity.ok("Your Request Opening an Account is Rejected By Bank");

	}

	// List of Transactions
	@GetMapping("/listoftransactions")
	public ResponseEntity<?> fetchAllTransactions() {
		System.out.println("inside AdminController::fetch all Transactions");
		return ResponseEntity.ok(transactionService.getAllTransactions());
	}

	// List of complaint
	@GetMapping("/complaintlist")
	public ResponseEntity<?> fetchAllComplaints() {
		System.out.println("inside adminController::fetch all compliants");
		return ResponseEntity.ok(complaintService.getAllComplaints());
	}

	// get all reqest for debit cards
	@GetMapping("/debitcardrequest")
	public ResponseEntity<?> getAllCardRequests() {

		return ResponseEntity.ok(debitCardService.getAllDebitCardRequest());
	}

	// Approved Debit Card Request
	@PutMapping("/approvecardrequest/{accId}")
	public ResponseEntity<?> approvedCard(@PathVariable int accId) throws MessagingException {
		System.out.println("inside adminController::approvedCard method ");

		return ResponseEntity.ok(debitCardService.approvedDebitCardRequest(accId));
	}

	// rejecting Debit Card Request
	@DeleteMapping("/rejectcardrequest/{accId}")
	public ResponseEntity<?> rejectCardRequest(@PathVariable int accId) {
		System.out.println("inside adminController::rejectCard method ");

		debitCardService.rejectDebitCardRequest(accId);

		return new ResponseEntity<>(HttpStatus.OK);
	}

}
