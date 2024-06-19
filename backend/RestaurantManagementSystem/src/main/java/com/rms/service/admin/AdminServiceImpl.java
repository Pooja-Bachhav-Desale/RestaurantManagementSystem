package com.rms.service.admin;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.rms.dto.CategoryDto;
import com.rms.entity.Category;
import com.rms.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

	private final CategoryRepository categoryRepository;
	
	public AdminServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository=categoryRepository;
	}

	@Override
	public CategoryDto postCategory(CategoryDto categoryDto) throws IOException {
		// TODO Auto-generated method stub
		Category category = new Category();
		category.setCategoryName(categoryDto.getCategoryName());
		category.setDescription(categoryDto.getDescription());
		category.setImg(categoryDto.getImg().getBytes());
		Category createdCategory = categoryRepository.save(category);
		CategoryDto dto = new CategoryDto();
		dto.setCategoryId(createdCategory.getCategoryId());
		return dto;
	}
	
}
