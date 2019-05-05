package jae.inventory.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jae.inventory.api.entity.Inventory;
import jae.inventory.api.repository.InventoryRepository;

@Service
public class InventoryService {
	
	@Autowired
	private InventoryRepository inventoryRepository;
	
	public Iterable<Inventory> findAllInventory(){
		return inventoryRepository.findAll();
	}
}
