package jae.inventory.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import jae.inventory.api.entity.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer>{
	
	// Get a category with a specific category id
	Category getByCateId(Integer cateId);
}
