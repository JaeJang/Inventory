package jae.inventory.api.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import jae.inventory.api.entity.Category;
import jae.inventory.api.entity.Inventory;
import jae.inventory.api.entity.Item;



@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Integer> {
	
	// Get a list of inventory items with the list of category ids
	// PARAM	: List of category id
	// RETURN	: List of inventory for the categories
	List<Inventory> findByCateIdIn(List<Category> cateId);
	
	// Get a inventory information with the id
	// PARAM	: Inventory id
	// RETURN	: Inventory item
	Inventory getById(Integer id);
	
	//Get a inventory information with the item
	// PARAM	: Item
	// RETURN	: Inventory information
	Inventory getByItemIn(Item item);
}
