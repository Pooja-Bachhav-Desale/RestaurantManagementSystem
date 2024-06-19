package com.rms.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dto.AuthenticationRequest;
import com.rms.dto.AuthenticationResponse;
import com.rms.dto.SignUpRequest;
import com.rms.dto.UserDto;
import com.rms.entity.User;
import com.rms.repository.UserRepository;
import com.rms.service.AuthService;
import com.rms.service.jwt.UserService;
import com.rms.service.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;
	
	private final AuthenticationManager authenticationManager;
	
	private final UserService userService ;
	
	private final JwtUtil jwtUtil;
	
	private final UserRepository repository;
	
	public AuthController(AuthService authService,AuthenticationManager manager,UserService userService ,JwtUtil jwtUtil,UserRepository userRepository) {
		this.authService=authService;
		this.authenticationManager = manager;
		this.userService = userService;
		this.jwtUtil=jwtUtil;
		this.repository=userRepository;
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest){
		UserDto createdUserDto = authService.createUser(signUpRequest);
		if(createdUserDto == null) {
			return new ResponseEntity<>("User not created",HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(createdUserDto,HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authReq,HttpServletResponse response) throws IOException {
		try {
			System.out.print("inside login");
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authReq.getEmail(),authReq.getPassword()));
		}catch(BadCredentialsException e) {
			throw new BadCredentialsException("Incorrect username and password");
		}catch(DisabledException disabledException) {
			response.sendError(HttpServletResponse.SC_NOT_FOUND,"User is not active");
			return null;
		}
		
		final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authReq.getEmail());
		final String jwt = jwtUtil.generateToken(userDetails);
		Optional<User> optionalUser = repository.findFirstByEmail(userDetails.getUsername());
		AuthenticationResponse authenticationResponse = new AuthenticationResponse();
		if(optionalUser.isPresent()) {
			authenticationResponse.setJwt(jwt);
			authenticationResponse.setUserRole(optionalUser.get().getUserRole());
			authenticationResponse.setUserId(optionalUser.get().getId());
		}
		return authenticationResponse;
		
	}
}
