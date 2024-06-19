package com.rms.service.jwt;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.rms.repository.UserRepository;

@Service
public class UserserviceImpl implements UserService{

	private final UserRepository userRepository;
	
	public UserserviceImpl(UserRepository userRepository) {
		this.userRepository=userRepository;
	}
	
	@Override
	public UserDetailsService userDetailsService() {
		// TODO Auto-generated method stub
		return new UserDetailsService() {
			
			@Override
			public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				// TODO Auto-generated method stub
				return userRepository.findFirstByEmail(username)
						.orElseThrow(()->new UsernameNotFoundException("User not found"));
			}
		};
	}

}
