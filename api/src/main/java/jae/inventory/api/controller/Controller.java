package jae.inventory.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	/*
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
	*/
	
	// Get all inventory information from DB
	@GetMapping("/inventory")
	public Iterable<Inventory> getAllInventory(){
		return inventoryService.findAllInventory();
	}
	
	// Get inventories for a specific category including all sub-categories items
	// PARAM	: Category id 
	// RETUEN	: List of inventory items based on the category including all sub-categories items
	@GetMapping("/inventory/{cateId}")
	public List<Inventory> getItmesByCategory(@PathVariable Integer cateId) {
		// Get all categories
		Iterable<Category> categories = categoryServie.findAllCategories();
		List<Category> categoryList = new ArrayList<Category>();
		
		// Find all categories belonged to the category
		for(Category c : categories) {
			if(c.getCateId() == cateId) {
				Integer id= c.getCateId();
				categoryList.add(categoryServie.findById(id));
				continue;
			}
			
			if(c.getParent() == null) continue;
			
			Category tmp = c;
			// Trace back a categorys parent and check if it's the child of the passed category 
			while((tmp = tmp.getParent()) != null) {
				if(tmp.getCateId() == cateId) {
					Integer id = c.getCateId();
					categoryList.add(categoryServie.findById(id));
					break;
				}
			}
			
		}
		return inventoryService.findInventoryByCate(categoryList);
		
	}
	
	// Get all items
	@GetMapping("/item")
	public Iterable<Item> getAllItems(){
		return itemService.findAllItem();
	}
	
	// Get all categories
	@GetMapping("/category")
	public Iterable<Category> getAllCategories(){
		return categoryServie.findAllCategories();
	}
	
	// Delete an item from the database with the passed item id
	// This deletes the corresponding inventory entry
	// PARAM	: Item id to be deleted
	// RETURN	: true if succeeded
	@DeleteMapping("/item/{itemId}")
	public ResponseEntity<?> test(@PathVariable Integer itemId){
		itemService.delete(itemId);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
	
	@DeleteMapping("/category/{itemId}")
	public ResponseEntity<?> test2(@PathVariable Integer itemId){
		categoryServie.delete(itemId);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
