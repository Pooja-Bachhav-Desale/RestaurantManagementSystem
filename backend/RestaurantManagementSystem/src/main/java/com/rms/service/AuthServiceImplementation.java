package com.rms.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rms.dto.SignUpRequest;
import com.rms.dto.UserDto;
import com.rms.entity.User;
import com.rms.enums.UserRole;
import com.rms.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Service
public class AuthServiceImplementation implements AuthService{

	private final UserRepository userRepository;

	public AuthServiceImplementation(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@PostConstruct
	public void createAdminAccount() {
		User adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
		if(adminAccount == null) {
			User user = new User();
			user.setName("admin");
			user.setEmail("admin@test.com");
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			user.setUserRole(UserRole.ADMIN);
			userRepository.save(user);
		}
	}

	@Override
	public UserDto createUser(SignUpRequest signUpRequest) {
		// TODO Auto-generated method stub
		User user = new User();
		user.setName(signUpRequest.getName());
		user.setEmail(signUpRequest.getEmail());
		user.setPassword(new BCryptPasswordEncoder().encode(signUpRequest.getPassword()));
		user.setUserRole(UserRole.CUSTOMER);
		User createdUser=userRepository.save(user);
		
		UserDto createdUserDto = new UserDto();
		createdUserDto.setId(createdUser.getId());
		createdUserDto.setName(createdUser.getName());
		createdUserDto.setEmail(createdUser.getEmail());
		createdUserDto.setUserRole(createdUser.getUserRole());
		
		return createdUserDto;
	}

}
