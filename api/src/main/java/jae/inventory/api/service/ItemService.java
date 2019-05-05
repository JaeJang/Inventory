package jae.inventory.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jae.inventory.api.entity.Item;
import jae.inventory.api.repository.ItemRepository;

@Service
public class ItemService{
	
	@Autowired
	private ItemRepository itemRepository;
	
	public Iterable<Item> findAllItem(){
		return itemRepository.findAll();
	}
	
	public Item saveItem(Item item) {
		if(item.getDescription() == null || item.getDescription() == "") {
			item.setDescription("");
		}
		return itemRepository.save(item);
	}
	
	public Item findById(Integer itemId) {
		return itemRepository.getByItemId(itemId);
	}
	
	public void delete(Integer itemId) {
		Item tmp = itemRepository.getByItemId(itemId);
		itemRepository.delete(tmp);
	}

}
