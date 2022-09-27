package com.app.serviceInterfaces;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface ImageHandlingService {

	void storeImage(String email, MultipartFile panCopy,MultipartFile profilePhoto) throws IOException;

	byte[] restoreImage(int custId) throws IOException;

}
