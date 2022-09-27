package com.app.dto;

import javax.validation.constraints.NotBlank;

import com.app.pojo.AccType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthRequest {
	@NotBlank(message = "Email can't be blank or null")
	private String email;
	@NotBlank(message = "password can't be blank or null")
	private String password;
	
	private AccType accType;
}
