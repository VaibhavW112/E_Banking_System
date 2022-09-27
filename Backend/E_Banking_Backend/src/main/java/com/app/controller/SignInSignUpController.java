package com.app.controller;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AccountDTO;
import com.app.dto.AdminAuthResp;
import com.app.dto.AuthRequest;
import com.app.dto.AuthResp;
import com.app.dto.ForgotPasswordDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.pojo.Account;
import com.app.pojo.Customer;
import com.app.serviceInterfaces.IAccountService;
import com.app.serviceInterfaces.ICustomerService;
import com.app.serviceInterfaces.ImageHandlingService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
@Slf4j
public class SignInSignUpController {
//dep : JWT utils : for generating JWT
	@Autowired
	private JwtUtils utils;
	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	
	@Autowired
	private PasswordEncoder enc;
	
	@Autowired
	private ImageHandlingService imageHandlingService;
	
	@Autowired
	private IAccountService accService;

	@Autowired
	private ICustomerService custService;

	// add a method to authenticate user . Incase of success --send back token , o.w
	// send back err mesg
	@PostMapping("/admin/signin")
	public ResponseEntity<?> validateUserCreateTokenForAdmin(@RequestBody @Valid AuthRequest request) {
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> imple by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			// => auth succcess
			System.out.println( "Bearer "+utils.generateJwtTokenforAdmin(authenticatedDetails));
			return ResponseEntity.ok(new AdminAuthResp("Auth successful!", utils.generateJwtTokenforAdmin(authenticatedDetails)));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err "+e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateTokenForCustomer(@RequestBody @Valid AuthRequest request) {
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> imple by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			// => auth succcess
		
			System.out.println( "Bearer "+utils.generateJwtTokenforCustomer(authenticatedDetails));
			return ResponseEntity.ok(new AuthResp(accService.getAccountByEmailIdAndAccType(request.getEmail(),request.getAccType()), utils.generateJwtTokenforCustomer(authenticatedDetails)));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err "+e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}catch(InternalAuthenticationServiceException e) {
			// send back err resp code
						System.out.println("err "+e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

	}
	
	@PostMapping("/createaccount")
	public ResponseEntity<?> createAccount(@RequestBody AccountDTO acc) {

		System.out.println("In Customers Create Account");

		Customer persistCust = custService.getCustomerByEmail(acc.getEmail());

		if (persistCust != null) {

			List<Account> accounts = accService.getAccountByCustomerId(persistCust.getCustomerId());

			boolean isAccountAlreadyPresent = false;
			for (Account persistAcc : accounts) {
				if (persistAcc.getAccType().equals(acc.getAccType())) {

					isAccountAlreadyPresent = true;
					break;
				}
			}

			if (!isAccountAlreadyPresent) {
				Account account = new Account(acc.getBalance(), false, acc.getAccType(), false, persistCust);

				return ResponseEntity.ok(accService.createAccount(account));

			} else
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

		persistCust = new Customer(acc.getFname(), acc.getLname(), acc.getEmail(), enc.encode(acc.getPassword()), acc.getDob(),
				acc.getGender(), acc.getMobileNo(), acc.getAddress(), acc.getPanNo(), acc.getAdharNo(),
				acc.getProfilePhoto(), acc.getPanCopy());

		Account account = new Account(acc.getBalance(), false, acc.getAccType(), false, persistCust);

		custService.createCustomer(persistCust);

		return ResponseEntity.ok(accService.createAccount(account));

	}

	@PostMapping("/{email}/images")
	public ResponseEntity<?> uploadImage(@PathVariable String email, @RequestParam MultipartFile panCopy,
			@RequestParam MultipartFile profilePhoto) throws IOException {
		System.out.println("in upload image " + email);
		System.out.println("uploaded img file name " + panCopy.getOriginalFilename() + " content type "
				+ panCopy.getContentType() + " size " + panCopy.getSize());
		System.out.println("uploaded img file name " + profilePhoto.getOriginalFilename() + " content type "
				+ profilePhoto.getContentType() + " size " + profilePhoto.getSize());
		// invoke service layer method to save uploaded file in the server side folder
		// --ImageHandligService
		if (panCopy.getOriginalFilename().endsWith(".png") || panCopy.getOriginalFilename().endsWith(".jpeg")
				|| panCopy.getOriginalFilename().endsWith(".jpg")) {
			if(profilePhoto.getOriginalFilename().endsWith(".png") || profilePhoto.getOriginalFilename().endsWith(".jpeg")
					|| profilePhoto.getOriginalFilename().endsWith(".jpg")) {
				imageHandlingService.storeImage(email, panCopy,profilePhoto);

				return ResponseEntity.ok("files Uploaded succesfully....!!");
			}
			else
				
				return ResponseEntity.ok("Profile Photo File Not Supported ");
		}
		
		return ResponseEntity.ok("PanCard File Not Supported ");
	}
	
	// add req handling method to download image for specific emp
		@GetMapping(value = "/{custId}/image", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
				MediaType.IMAGE_PNG_VALUE })
		public ResponseEntity<?> downloadImage(@PathVariable int custId) throws IOException{
			System.out.println("in img download " + custId);
			//invoke service layer method , to get image data from the server side folder
			byte[] imageContents=imageHandlingService.restoreImage(custId);
			return ResponseEntity.ok(imageContents);
		}
	
	@PostMapping("/forgotpassword")
	public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO fp) throws MessagingException {
		System.out.println("in forgot password "+fp.getEmail());
		
		return ResponseEntity.ok(custService.forgotpassword(fp.getEmail()));
	}

}
