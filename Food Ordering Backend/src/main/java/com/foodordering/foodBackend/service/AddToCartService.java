package com.foodordering.foodBackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.foodordering.foodBackend.model.Food;

@Service
public interface AddToCartService {

	public String addToFoodTable(Food food);

	public List<Food> getAllAvailableFoods();



}
