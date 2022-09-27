package com.app.serviceImpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_excpetions.ResourceNotFoundException;
import com.app.pojo.Customer;
import com.app.repository.CustomerRepository;
import com.app.serviceInterfaces.ImageHandlingService;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	@Value("${file.upload.location}")
	private String baseFolder;

	@Autowired
	private CustomerRepository custRepo;

	@Override
	public void storeImage(String email, MultipartFile panCopy, MultipartFile profilePhoto) throws IOException {
		// get emp dtls from emp id
		Customer cust = custRepo.findByEmail(email);
		// emp => persistent
		// get complete path to the file , to be stored
		String completePath1 = baseFolder + File.separator + panCopy.getOriginalFilename();
		String completePath2 = baseFolder + File.separator + profilePhoto.getOriginalFilename();
		
		System.out.println("complete path " + completePath1);
		System.out.println("complete path " + completePath2);
		
		System.out.println("Copied no of bytes "
				+ Files.copy(panCopy.getInputStream(), Paths.get(completePath1), StandardCopyOption.REPLACE_EXISTING));

		System.out.println("Copied no of bytes " + Files.copy(profilePhoto.getInputStream(), Paths.get(completePath2),
				StandardCopyOption.REPLACE_EXISTING));
		// save complete path to the image in db

		// In case of saving file in db : simply call : imageFile.getBytes() --> byte[]
		// --call setter on emp !
		cust.setPanCopy(completePath1);// save complete path to the file in db
		cust.setProfilePhoto(completePath2);
		System.out.println("images uploaded");
	}


	@Override
	public byte[] restoreImage(int custId) throws IOException{
		// get emp dtls from emp id
		Customer cust = custRepo.findById(custId).orElseThrow(() -> new ResourceNotFoundException("Invalid Emp Id"));
		// emp => persistent
		// get complete img path from db --> extract image contents n send it to the
		// caller
		String path = cust.getProfilePhoto();
		System.out.println("img path " + path);
		//API of java.nio.file.Files class : public byte[] readAllBytes(Path path)
		return Files.readAllBytes(Paths.get(path));
		//in case of BLOB in DB --simply call emp.getImage() --> byte[] --> ret it to the caller!
	}

}
