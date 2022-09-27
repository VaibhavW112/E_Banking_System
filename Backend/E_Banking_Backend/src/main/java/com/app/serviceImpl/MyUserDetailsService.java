package com.app.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.pojo.Admin;
import com.app.pojo.Customer;
import com.app.repository.AccountRepository;
import com.app.repository.AdminRepository;
import com.app.repository.CustomerRepository;

@Service // or @Component also works!
@Transactional

public class MyUserDetailsService implements UserDetailsService {
	// dep : user repository : based upon spring data JPA
	@Autowired
	private CustomerRepository custRepo;
	
	@Autowired
	private AccountRepository accRepo;
	
	@Autowired
	private AdminRepository adminRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("in load by user nm " + email);
		// invoke dao's method to load user details from db by username(ie. actaully an
		// email)
		Customer cust = custRepo.findByEmail(email);
		if(cust==null) {
			Admin admin = adminRepo.findByEmail(email);
			if(admin==null) {
				return null;
			}
			return new AdminDetails(admin);
		}
		
		System.out.println("lifted user dtls from db "+cust);
		return new CustomerDetails(cust);
	}

}
