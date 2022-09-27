package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangePasswordDTO {
	private String newPassword ;
	private String confirmPassword;
	private String oldPassword;
	
}
