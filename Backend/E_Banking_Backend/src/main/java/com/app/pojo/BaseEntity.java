package com.app.pojo;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//common super class for all entities
@MappedSuperclass
/*
 * 
 * Meaning : Class level annotation to specify to hibernate : it's common base
 * class --entities can extend from it . no table associated.
 */
@Getter
@Setter
@ToString

public class BaseEntity {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;

	private String fname;

	private String lname;

	// ^[A-Za-z0-9+_.-]+@(.+)$
	@Column(name = "email", unique = true)
	// @Email(regexp = "^(.+)@(\\\\\\\\S+)$", flags = Pattern.Flag.CASE_INSENSITIVE)
	private String email;
//"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8,20}$"
	//@Pattern(regexp = "^(?=.*[0-9])")
	//@NotBlank(message = "New Password is mandatory")
	private String password;

	public BaseEntity(String fname, String lname, String email, String password) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.password = password;
	}

	public BaseEntity() {

	}

}
