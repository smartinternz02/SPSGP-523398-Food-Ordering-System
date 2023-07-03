package com.foodordering.foodBackend.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodordering.foodBackend.model.Food;
import com.foodordering.foodBackend.repository.FoodRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AddToCartServiceImpl implements AddToCartService {

	@Autowired
	FoodRepository foodRepository;

	@Override
	public String addToFoodTable(Food food) {
		Food foodInsert = foodRepository.save(food);
		if (foodInsert != null) {
			return food.getName().concat(" has been added to the food table successfully");
		}
		return "Failed to add ".concat(food.getName()).concat(" to the food table");
	}

	@Override
	public List<Food> getAllAvailableFoods() {
		List<Food> foodItemsList = new ArrayList<>();
		Iterator<Food> queryResults = foodRepository.findAll().iterator();
		while (queryResults.hasNext()) {
			foodItemsList.add(queryResults.next());
		}
		return foodItemsList;
	}
}
