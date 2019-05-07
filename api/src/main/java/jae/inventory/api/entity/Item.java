package jae.inventory.api.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Item")
public class Item {
	
	//PRIMARY KEY
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "itemId")
	private Integer itemId;
	
	@Column(name = "itemName", nullable = false)
	private String itemName;
	

	@Column(name = "price", columnDefinition = "Decimal(10,2)", nullable = false)
	private Double price;
	
	@Column(name = "description")
	private String description;
	
	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
	Set<Inventory> inventory = new HashSet<Inventory>();
	
	public String getItemName() {
		return itemName;
	}
	
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Integer getitemId() {
		return itemId;
	}

	public void setitemId(Integer itemId) {
		this.itemId = itemId;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
	
}
