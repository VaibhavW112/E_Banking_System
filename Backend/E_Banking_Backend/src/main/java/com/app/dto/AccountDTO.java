package com.app.dto;

import java.time.LocalDate;

import com.app.pojo.AccType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class AccountDTO {
	
    private String fname;
	
	private String lname;
	
	private String email;
	
	private String password;

	private LocalDate dob;
	
	private char gender ;
	
	private long mobileNo;
	
	private String address ;
	
	private String panNo;
	
	private long adharNo;
	
	private String profilePhoto;
	
	private String panCopy;
	
	private double balance ;

	private AccType accType;
	
	
}
