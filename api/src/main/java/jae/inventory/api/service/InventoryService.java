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
	
	public Iterable<Inventory> findAllInventory(){
		return inventoryRepository.findAll();
	}
	
	public List<Inventory> findInventoryByCate(List<Category> cateId){
		return inventoryRepository.findByCateIdIn(cateId);
	}
	
	public Inventory findByItem(Item item) {
		return inventoryRepository.getByItemIn(item);
		
	}
	
	public void delete(Integer id) {
		Inventory tmp = inventoryRepository.getById(id);
		inventoryRepository.delete(tmp);
	}
}
