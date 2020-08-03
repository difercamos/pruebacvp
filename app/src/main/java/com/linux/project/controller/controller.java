package com.linux.project.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.linux.project.controller.Message;

@RestController
@CrossOrigin(
  origins = "*",
  methods = {
    RequestMethod.GET,
    RequestMethod.POST,
    RequestMethod.PUT,
    RequestMethod.DELETE,
  }
)
public class controller {

  @GetMapping("/api/v1/ejercicio/1/")
  public  Message index() {
    Double a = 0.0;
    Double b = 0.0;
    String message = "";
    if (a == b) {
      message = "Los dos objetos son iguales 1.";
      System.out.println("Los dos objetos son iguales 1.");
    } else if (a.equals(b)) {
      message = "Los dos objetos son iguales 2.";
      System.out.println("Los dos objetos son iguales 2.");
    }
    return new Message(message);
  }

  @GetMapping("/api/v1/ejercicio/{days}/{houses}")
  public Message home(@PathVariable Long days, @PathVariable String houses) {
    String message = "";
    if (days > 0) {
      if (houses.length() == 8) {
        char aux = '0';
        String newHouses = "";
        for (int y = 0; y < days; y++) {
          for (int x = 0; x < houses.length(); x++) {
            if (x == 0) {
              if (aux == houses.charAt(x + 1)) newHouses +=
                "0"; else newHouses += "1";
            } else if (x == houses.length() - 1) {
              if (aux == houses.charAt(x - 1)) newHouses +=
                "0"; else newHouses += "1";
            } else {
              if (houses.charAt(x - 1) == houses.charAt(x + 1)) newHouses +=
                "0"; else newHouses += "1";
            }
          }
          houses = newHouses;
          newHouses = "";
        }
        message = houses;
      } else {
        message = "Datos del arreglo erroneo, deben ser 8 caracteres.";
      }
    } else {
      message = "El numero de dias debe ser mayor a 0.";
    }
    return new Message(message);
  }
}
