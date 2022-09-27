package com.app.pojo;

import java.time.LocalDate;

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

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude="account")
@Entity
@Table(name = "transactions")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tx_id")
	private int transactionId;

	private double amount;

	private LocalDate date;
	
	@Column(name = "receiver_acc_no")
	private int receiverAccNo;
	
	@Enumerated(EnumType.STRING) 
	@Column(length = 20,name="tx_type")
	private TransactionType txType;
	
	@Column(name="tx_status")
	private boolean txStatus;
	
	@ManyToOne
	@JoinColumn(name="acc_no")
	private Account account;
	
	public Transaction() {
		
	}

	public Transaction(double amount,int receiverAccNo, TransactionType txType,
			boolean txStatus, Account account) {
		
		
		this.amount = amount;
		this.date = LocalDate.now();
		this.receiverAccNo = receiverAccNo;
		this.txType = txType;
		this.txStatus = txStatus;
		this.account = account;
	}
	
	
}
