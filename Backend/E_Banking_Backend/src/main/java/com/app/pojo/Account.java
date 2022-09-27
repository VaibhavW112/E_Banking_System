package com.app.pojo;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Range;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude="customer")
@Entity
@Table(name="accounts")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="account_no")
	private int accountId;
	
	@Column(name="ifsc_code")
	private final String ifscCode="EBANK2022";
	
	@Range(min=5000,message="Balance is too low")
	private double balance ;
	
	@Column(name="is_net_banking_active")
	private boolean isNetBankingActive;
	
	@Enumerated(EnumType.STRING) 
	@Column(length = 20,name="acc_type")
	private AccType accType;
	
	@Column(name="is_Debit_Card_Assigned")
	private boolean isDebitCardAssigned=false;
	
	@Column(name="request_debitcard")
	private boolean requestDebitCard;
	
	
	@ManyToOne
	@JoinColumn(name="cust_id")
	private Customer customer;
	
	public Account() {
		
	}
	

	public Account(@Range(min = 5000, message = "Balance is too low") double balance, boolean isNetBankingActive,
			AccType accType, boolean isDebitCardAssigned, Customer customer) {
		super();
		this.balance = balance;
		this.isNetBankingActive = isNetBankingActive;
		this.accType = accType;
		this.isDebitCardAssigned = isDebitCardAssigned;
		this.customer = customer;
	}

}
