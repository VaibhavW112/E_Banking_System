package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ChangePasswordDTO;
import com.app.dto.TransactionDTO;
import com.app.pojo.Complaint;
import com.app.pojo.Transaction;
import com.app.serviceInterfaces.IAccountService;
import com.app.serviceInterfaces.IComplaintService;
import com.app.serviceInterfaces.ICustomerService;
import com.app.serviceInterfaces.IDebitCardService;
import com.app.serviceInterfaces.ITransactionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	private ICustomerService custService;

	@Autowired
	private ITransactionService txService;

	@Autowired
	private IAccountService accService;

	@Autowired
	private IComplaintService comService;

	@Autowired
	private IDebitCardService cardService;

	public CustomerController() {
		System.out.println("in Customer controller");
	}

	@PostMapping("/passwordchange/{custId}")
	public ResponseEntity<?> changePassword(@PathVariable int custId, @RequestBody ChangePasswordDTO cpdto) {
		System.out.println("in Customers Change Password");
		System.out.println(cpdto);
		return ResponseEntity.ok(custService.changePassword(custId, cpdto.getNewPassword(), cpdto.getConfirmPassword(),
				cpdto.getOldPassword()));

	}

	@PostMapping("/moneytransfer")
	public ResponseEntity<?> moneyTransfer(@RequestBody TransactionDTO txDto) {
		System.out.println("in Money Transfer " + txDto);
		return ResponseEntity.ok(
				txService.moneyTransfer(txDto.getSenderAccountNo(), txDto.getReciverAccountNo(), txDto.getAmount()));

	}

	@GetMapping("/transactions/{accNo}")
	public ResponseEntity<?> getCustomersAlltransactions(@PathVariable int accNo) {
		System.out.println("in Customer Transactions");
		List<Transaction> accTxs = txService.getAccountTransactions(accNo);

		return ResponseEntity.ok(accTxs);

	}

	@GetMapping("/getbalance/{accId}")
	public ResponseEntity<?> accountBalance(@PathVariable int accId) {
		System.out.println("In Customer Account");

		return ResponseEntity.ok(accService.accountBalance(accId));

	}

	@PostMapping("/registercomplaint/{accId}")
	public ResponseEntity<?> complaintRegister(@PathVariable int accId, @RequestBody Complaint comp) {
		System.out.println("In Customers Register Complaint");

		comService.registerComplaint(accId, comp);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/getcomplaints/{accId}")
	public ResponseEntity<?> getAllComplaints(@PathVariable int accId) {

		System.out.println("In Customers All Complaint");

		return ResponseEntity.ok(comService.getAllCustomersComplaints(accId));

	}

	@PutMapping("/requestcard/{accNo}")
	public ResponseEntity<?> requestDebitCard(@PathVariable int accNo) {

		System.out.println("In Customers request Debit card");

		return ResponseEntity.ok(cardService.requestDebitCard(accNo));

	}

}
