package com.app.serviceImpl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojo.Admin;
import com.app.repository.AdminRepository;
import com.app.serviceInterfaces.IAdminService;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {

	@Autowired
	private AdminRepository adminRepo;

	// admin login
	@Override
	public Admin login(String email, String password) {
		Admin admin = adminRepo.findByEmailAndPassword(email, password);
		if (admin != null)
			return admin;
		else
			return null;
	}

}
