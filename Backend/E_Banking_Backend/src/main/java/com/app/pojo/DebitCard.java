package com.app.pojo;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Future;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude="account")
@Entity
@Table(name = "debit_cards")
public class DebitCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sr_no")
	private int srNo;
	
	
	@Column(name = "card_no")
	private long cardNo;
	
	private int pin;
	
	@Future
	private LocalDate expDate;
	
	private int cvv;
	
	private boolean isCardActive;
	
	@OneToOne
	@JoinColumn(name="acc_no")
	@MapsId
	private Account account;
	
	
}
