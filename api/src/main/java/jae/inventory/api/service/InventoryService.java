package jae.inventory.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jae.inventory.api.entity.Category;
import jae.inventory.api.entity.Inventory;
import jae.inventory.api.entity.Item;
import jae.inventory.api.repository.InventoryRepository;

@Service
public class InventoryService {
	
	@Autowired
	private InventoryRepository inventoryRepository;
	
	// Find all inventory information from the repository
	// RETURN	: List of inventories 
	public Iterable<Inventory> findAllInventory(){
		return inventoryRepository.findAll();
	}
	
	// Find a list of inventory for the list of category ids
	// PARAM	: List of category id that we want to find
	// RETURN	: List of inventories found from the repository
	public List<Inventory> findInventoryByCate(List<Category> cateId){
		return inventoryRepository.findByCateIdIn(cateId);
	}
	
	// Find a inventory for the passed item object
	// PARAM	: Item that want to find
	// RETURN	: the inventory information for the item
	public Inventory findByItem(Item item) {
		return inventoryRepository.getByItemIn(item);
	}
	
	// Delete a inventory with the inventory id
	// Deleting a inventory will delete a item related to the inventory from the database
	// PARAM	: Inventory id
	public void delete(Integer id) {
		Inventory tmp = inventoryRepository.getById(id);
		inventoryRepository.delete(tmp);
	}
}
