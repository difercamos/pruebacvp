package com.linux.project.exception;

public class PersonNotFoundException extends RuntimeException {

  public PersonNotFoundException(Long id) {
    super("Could not find Person " + id);
  }
}