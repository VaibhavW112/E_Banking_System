package com.app.pojo;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "customer_no")
	private int customerId;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;

	private char gender;

	@Column(name = "mobile_no")
	private long mobileNo;

	private String address;

	@Column(name = "pan_no")
	@Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}")
	private String panNo;

	@Column(name = "adhar_no")
	// @Range(max=12,message="Invalid Adhar No")
	private long adharNo;

	@Column(name = "profile_photo")
	private String profilePhoto;

	@Column(name = "pan_copy")
	private String panCopy;

	public Customer(String fname, String lname, String email, String password, LocalDate dob, char gender,
			long mobileNo, String address, String panNo, long adharNo, String profilePhoto, String panCopy) {
		super(fname, lname, email, password);

		this.dob = dob;
		this.gender = gender;
		this.mobileNo = mobileNo;
		this.address = address;
		this.panNo = panNo;
		this.profilePhoto = profilePhoto;
		this.adharNo = adharNo;
		this.panCopy = panCopy;
	}

	public Customer() {

	}

}
