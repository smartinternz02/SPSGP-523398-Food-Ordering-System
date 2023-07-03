package com.foodordering.foodBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodordering.foodBackend.model.Food;
import com.foodordering.foodBackend.service.AddToCartService;

@RestController
@RequestMapping("/foodOrdering/food")
public class FoodController {

	@Autowired
	AddToCartService service;

	@GetMapping("/getAllFoodProducts")
	public List<Food> getAllAvailableFoods() {
		return service.getAllAvailableFoods();
	}

	@PostMapping("/addNewFoodProduct")
	public String addNewFoodProduct(@RequestBody Food food) {
		return service.addToFoodTable(food);
	}

}
