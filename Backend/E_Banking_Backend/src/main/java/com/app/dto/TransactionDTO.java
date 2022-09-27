package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TransactionDTO {
	
	private int senderAccountNo;
	private int reciverAccountNo;
	private double amount;

	public TransactionDTO() {

	}

	public TransactionDTO(int senderAccountNo, int reciverAccountNo, double amount) {
		this.senderAccountNo = senderAccountNo;
		this.reciverAccountNo = reciverAccountNo;
		this.amount = amount;
	}

}
