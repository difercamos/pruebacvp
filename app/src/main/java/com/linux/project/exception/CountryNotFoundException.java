package com.linux.project.exception;

public class CountryNotFoundException extends RuntimeException {

  public CountryNotFoundException(Long id) {
    super("Could not find country " + id);
  }
}