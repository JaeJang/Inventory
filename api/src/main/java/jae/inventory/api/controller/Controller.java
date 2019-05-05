package jae.inventory.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jae.inventory.api.entity.Category;
import jae.inventory.api.entity.Inventory;
import jae.inventory.api.entity.Item;
import jae.inventory.api.service.CategoryService;
import jae.inventory.api.service.InventoryService;
import jae.inventory.api.service.ItemService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Controller {

	@Autowired
	private InventoryService inventoryService;
	@Autowired 
	private ItemService itemService;
	@Autowired	
	private CategoryService categoryServie;
	
	@PostMapping("/item")
	public ResponseEntity<?> addNewItem(@RequestBody Item item, BindingResult result){
		if(result.hasErrors()) {
			Map<String,String> errorMap = new HashMap<>();
			
			for(FieldError error: result.getFieldErrors()) {
				errorMap.put(error.getField(), error.getDefaultMessage());
			}
			return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
		}
		
		Item newItem = itemService.saveItem(item);
		
		return new ResponseEntity<Item>(newItem, HttpStatus.CREATED);
	}
	
	@GetMapping("/allInventory")
	public Iterable<Inventory> getAllInventory(){
		return inventoryService.findAllInventory();
	}
	
	@GetMapping("/allItems")
	public Iterable<Item> getAllItems(){
		return itemService.findAllItem();
	}
	
	@GetMapping("/allCategories")
	public Iterable<Category> getAllCategories(){
		return categoryServie.findAllCategories();
	}
}
