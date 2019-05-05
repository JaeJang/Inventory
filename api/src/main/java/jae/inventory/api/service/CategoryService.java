package jae.inventory.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jae.inventory.api.entity.Category;
import jae.inventory.api.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public Iterable<Category> findAllCategories(){
		return categoryRepository.findAll();
	}
	
	public Category findById(Integer cateId) {
		return categoryRepository.getByCateId(cateId);
	}

}
