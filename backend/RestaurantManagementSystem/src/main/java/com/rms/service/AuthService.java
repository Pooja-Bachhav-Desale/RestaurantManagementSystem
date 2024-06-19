package com.rms.service;

import com.rms.dto.SignUpRequest;
import com.rms.dto.UserDto;

public interface AuthService {

	UserDto createUser(SignUpRequest signUpRequest);

}
