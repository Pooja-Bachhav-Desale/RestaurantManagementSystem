package com.rms.service.admin;

import java.io.IOException;

import com.rms.dto.CategoryDto;

public interface AdminService {

	CategoryDto postCategory(CategoryDto categoryDto) throws IOException;

}
