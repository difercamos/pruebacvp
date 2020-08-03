package com.linux.project.controller;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.linux.project.repository.CountryRepository;
import com.linux.project.model.Country;
import com.linux.project.exception.CountryNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CountryController {

  private final CountryRepository repository;

  CountryController(CountryRepository repository) {
    this.repository = repository;
  }

  // Aggregate root

  @GetMapping("/countries")
  List<Country> all() {
    return repository.findAll();
  }

  @PostMapping("/countries")
  Country newCountry(@RequestBody Country newCountry) {
    return repository.save(newCountry);
  }

  // Single item

  @GetMapping("/countries/{id}")
  Country one(@PathVariable Long id) {
    return repository
      .findById(id)
      .orElseThrow(() -> new CountryNotFoundException(id));
  }

  @PutMapping("/countries/{id}")
  Country replaceCountry(
    @RequestBody Country newCountry,
    @PathVariable Long id
  ) {
    return repository
      .findById(id)
      .map(
        country -> {
          country.setName(newCountry.getName());
          return repository.save(country);
        }
      )
      .orElseGet(
        () -> {
          newCountry.setId(id);
          return repository.save(newCountry);
        }
      );
  }

  @DeleteMapping("/countries/{id}")
  void deleteCountry(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
