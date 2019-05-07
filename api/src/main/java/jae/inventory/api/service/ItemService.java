package jae.inventory.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jae.inventory.api.entity.Item;
import jae.inventory.api.repository.ItemRepository;

@Service
public class ItemService{
	
	@Autowired
	private ItemRepository itemRepository;
	
	// Find all items from the repository
	// RETURN	: List of items
	public Iterable<Item> findAllItem(){
		return itemRepository.findAll();
	}
	
	/*
	public Item saveItem(Item item) {
		if(item.getDescription() == null || item.getDescription() == "") {
			item.setDescription("");
		}
		return itemRepository.save(item);
	}
	*/
	
	// Find a item for the passed item id
	// RETURN: Item according to the item id
	public Item findById(Integer itemId) {
		return itemRepository.getByItemId(itemId);
	}
	
	// Delete a item
	// This will not be used since a item will be deleted automatically 
	// when a related inventory is deleted
	public void delete(Integer itemId) {
		Item tmp = itemRepository.getByItemId(itemId);
		itemRepository.delete(tmp);
	}

}
