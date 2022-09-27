package com.app.serviceImpl;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.pojo.Customer;

import lombok.ToString;
@ToString
public class CustomerDetails implements UserDetails {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private Customer user;

	public CustomerDetails(Customer user) {
		super();
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// Meaning : This method should ret Collection(List) of granted authorities ,
		// for a specific user --which will be later stored in Auth obj
		//SimpleGrantedAuthority(String roleName)  imple  GrantedAuthority
		//UserEntity ---> Role	
		
//		return user.getRoles() //Set<Role>
//		 .stream() //Stream<Role>
//		 .map(role -> new SimpleGrantedAuthority(role.getRoleName().name())) //Stream<SimpleGrantedAuthority>
//		 .collect(Collectors.toList());		
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
