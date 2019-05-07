package jae.inventory.api.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Category")
public class Category {
	
	//PRIMAY KEY
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cateId")
	private Integer cateId;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	//FORIEGN KEY REFERENCES Category(cateId) ON DELETE CASCADE
	@JoinColumn(name = "parent")
	@ManyToOne
	private Category parent;

	@OneToMany(mappedBy = "cateId", cascade = CascadeType.ALL)
	Set<Inventory> inventory = new HashSet<Inventory>();
	
	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
	Set<Category> category = new HashSet<Category>();
 

	public Integer getCateId() {
		return cateId;
	}

	public void setCateId(Integer cateId) {
		this.cateId = cateId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getParent() {
		return parent;
	}

	public void setParent(Category parent) {
		this.parent = parent;
	}


	
	
}
