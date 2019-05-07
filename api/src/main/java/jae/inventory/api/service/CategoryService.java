package jae.inventory.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jae.inventory.api.entity.Category;
import jae.inventory.api.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	// Find all categories from the repository
	// RETURN	: List of categories
	public Iterable<Category> findAllCategories(){
		return categoryRepository.findAll();
	}
	
	// Find a category information with the passed category id
	// PARAM	: Category id
	// RETURN	: A category for the category id
	public Category findById(Integer cateId) {
		return categoryRepository.getByCateId(cateId);
	}

	public ResponseEntity<?> delete(Integer cateId){
		categoryRepository.deleteById(cateId);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
