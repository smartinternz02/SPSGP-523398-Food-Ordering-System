package com.foodordering.foodBackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.foodordering.foodBackend.model.Food;


@Repository
@Component
public interface FoodRepository extends CrudRepository<Food, Integer> {

}
