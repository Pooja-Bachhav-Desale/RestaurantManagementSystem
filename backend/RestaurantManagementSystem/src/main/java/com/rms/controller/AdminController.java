package com.rms.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rms.dto.CategoryDto;
import com.rms.service.admin.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private final AdminService adminService;
	
	public AdminController(AdminService adminService) {
		this.adminService=adminService;
	}
	
	@PostMapping("/category")
	public ResponseEntity<CategoryDto> postCategory(@ModelAttribute CategoryDto categoryDto) throws IOException{
		CategoryDto newcategoryDto = adminService.postCategory(categoryDto);
		if(newcategoryDto == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(newcategoryDto);
	}
	
}
